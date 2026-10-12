// public/videos altındaki dosyaların boyutlarını worker/video-sizes.json'a yazar.
// Worker, Range isteklerinde toplam boyutu bilmek zorunda (statik dosya yanıtında her zaman gelmiyor).
import { readdirSync, statSync, writeFileSync } from "node:fs";

const dir = "public/videos";
const sizes = {};
for (const name of readdirSync(dir).sort()) {
  const st = statSync(`${dir}/${name}`);
  if (st.isFile() && !name.startsWith(".")) sizes[`/videos/${name}`] = st.size;
}
writeFileSync("worker/video-sizes.json", JSON.stringify(sizes, null, 2) + "\n");
