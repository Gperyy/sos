interface Env {
  SOS_DATA: KVNamespace;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  try {
    const body: { email?: string } = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return Response.json({ error: "E-posta adresi gereklidir." }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Geçerli bir e-posta adresi giriniz." }, { status: 400 });
    }

    // Duplicate check
    const existing = await env.SOS_DATA.get(`subscriber:${email}`);
    if (existing) {
      return Response.json({ error: "Bu e-posta adresi zaten kayıtlı." }, { status: 409 });
    }

    // Store subscriber in KV
    await env.SOS_DATA.put(`subscriber:${email}`, JSON.stringify({
      email,
      subscribedAt: new Date().toISOString(),
    }));

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Bir hata oluştu. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
