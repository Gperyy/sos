interface Env {
  SOS_DATA: KVNamespace;
}

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  try {
    const body: ContactPayload = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim() || "";
    const subject = body.subject || "Genel";
    const message = body.message?.trim();

    // Required field validation
    if (!name) {
      return Response.json({ error: "Ad Soyad alanı zorunludur." }, { status: 400 });
    }
    if (!email) {
      return Response.json({ error: "E-posta alanı zorunludur." }, { status: 400 });
    }
    if (!message) {
      return Response.json({ error: "Mesaj alanı zorunludur." }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Geçerli bir e-posta adresi giriniz." }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const entryKey = `contact:${timestamp}:${email}`;

    // Store in KV
    await env.SOS_DATA.put(entryKey, JSON.stringify({
      name,
      email,
      phone,
      subject,
      message,
      submittedAt: timestamp,
    }));

    // Send email notification via MailChannels (non-blocking)
    context.request.signal && context.request.signal;

    const sendEmail = async () => {
      try {
        const mailBody = JSON.stringify({
          personalizations: [
            {
              to: [{ email: "semin.ozturk@acromach.com" }],
            },
          ],
          from: {
            email: "noreply@seminair.com",
            name: "Semin Öztürk Şener Website",
          },
          subject: `İletişim Formu: ${subject} - ${name}`,
          content: [
            {
              type: "text/plain",
              value: [
                `Ad Soyad: ${name}`,
                `E-posta: ${email}`,
                phone ? `Telefon: ${phone}` : null,
                `Konu: ${subject}`,
                ``,
                `Mesaj:`,
                message,
                ``,
                `Gönderim Tarihi: ${new Date(timestamp).toLocaleString("tr-TR")}`,
              ]
                .filter(Boolean)
                .join("\n"),
            },
          ],
        });

        await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: mailBody,
        });
      } catch {
        // MailChannels failure is non-critical; silently ignore
      }
    };

    // Non-blocking email send
    context.waitUntil?.(sendEmail());

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Bir hata oluştu. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
