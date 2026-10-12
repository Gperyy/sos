// Statik dosyaların önüne giren küçük Worker. Yalnızca wrangler.jsonc'deki `run_worker_first`
// yollarında çalışır; diğer her şey doğrudan statik dosya sunucusundan gelir.
//
// 1) /assets/*: Olmayan bir dosya istenirse SPA kuralı yüzünden index.html (200) dönüyordu.
//    Eski önbellekteki sayfa silinmiş JS paketini isteyince Safari HTML'i JS sanıp bembeyaz kalıyordu.
//    Artık gerçek 404 dönülür (sayfadaki açılış bekçisi bunu görüp yeniler).
// 2) /videos/*: iOS Safari videoyu ancak parça parça (Range → 206) alabilirse oynatır. Statik dosya
//    sunucusu Range'i yok sayıp tüm dosyayı 200 ile gönderiyordu; burada istenen aralık kesilip verilir.

import videoSizes from "./video-sizes.json";

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

// Workers'a özgü: uzunluğu belli akış; böylece yanıt chunked değil Content-Length ile gider
declare const FixedLengthStream: new (length: number) => TransformStream<Uint8Array, Uint8Array>;

const isHtml = (res: Response) => (res.headers.get("content-type") || "").includes("text/html");

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    const res = await env.ASSETS.fetch(request);

    if (pathname.startsWith("/assets/") || pathname.startsWith("/videos/")) {
      if (res.status === 200 && isHtml(res)) return new Response("Not found", { status: 404 });
    }
    if (pathname.startsWith("/videos/")) return withRange(request, res, pathname);
    return res;
  },
};

/** "bytes=a-b" | "bytes=a-" | "bytes=-n" → [başlangıç, bitiş] (dahil). Geçersiz/çoklu aralıkta null. */
function parseRange(header: string, size: number): [number, number] | "invalid" | null {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === "" && m[2] === "")) return null;
  let start: number;
  let end: number;
  if (m[1] === "") {
    // Son n bayt
    start = Math.max(0, size - Number(m[2]));
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) return "invalid";
  return [start, end];
}

function withRange(request: Request, res: Response, pathname: string): Response {
  const range = request.headers.get("range");
  // Toplam boyut: yanıtta varsa oradan, yoksa build sırasında üretilen listeden
  const size =
    Number(res.headers.get("content-length")) ||
    (videoSizes as Record<string, number>)[decodeURIComponent(pathname)];
  // Zaten kısmi yanıt geldiyse, hata/304 ise ya da boyut bilinmiyorsa dokunma
  if (res.status !== 200 || !Number.isFinite(size) || size <= 0) return res;

  const headers = new Headers(res.headers);
  headers.set("accept-ranges", "bytes");
  if (!range) return new Response(res.body, { status: 200, headers });

  const parsed = parseRange(range, size);
  if (parsed === null) return new Response(res.body, { status: 200, headers });
  if (parsed === "invalid") {
    res.body?.cancel();
    headers.set("content-range", `bytes */${size}`);
    headers.delete("content-length");
    return new Response(null, { status: 416, headers });
  }

  const [start, end] = parsed;
  headers.set("content-range", `bytes ${start}-${end}/${size}`);
  const length = end - start + 1;
  headers.set("content-length", String(length));
  const body =
    res.body && request.method !== "HEAD"
      ? slice(res.body, start, end).pipeThrough(new FixedLengthStream(length))
      : null;
  if (!body) res.body?.cancel();
  return new Response(body, { status: 206, headers });
}

/** Akışı baştan okuyup yalnızca [start, end] baytlarını geçirir; sona gelince kaynağı kapatır. */
function slice(src: ReadableStream<Uint8Array>, start: number, end: number): ReadableStream<Uint8Array> {
  const reader = src.getReader();
  let pos = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) return controller.close();
        const chunkStart = pos;
        pos += value.byteLength;
        if (pos <= start) continue; // henüz aralığa gelmedik
        const from = Math.max(0, start - chunkStart);
        const to = Math.min(value.byteLength, end + 1 - chunkStart);
        if (to > from) controller.enqueue(value.subarray(from, to));
        if (pos > end) {
          reader.cancel();
          controller.close();
        }
        return;
      }
    },
    cancel(reason) {
      reader.cancel(reason);
    },
  });
}
