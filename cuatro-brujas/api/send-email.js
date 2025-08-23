import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, name, code } = req.body;

  if (!to || !name || !code) {
    return res.status(400).json({ error: "Faltan campos requeridos: to, name, code" });
  }

  try {
    await sendgrid.send({
      to,
      from: {
        email: process.env.FROM_EMAIL || "noreply@cuatrobrujas.pe",
        name: process.env.FROM_NAME || "CuatroBrujas",
      },
      subject: "✨ Tu Código de Acceso - Cuatro Brujas ✨",
      html: `
        <div style="background: #1c1124; color: #fff; font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <img src="https://cuatrobrujas.pe/logo.png" alt="Cuatro Brujas" style="width:150px; margin-bottom:20px;" />
          <h2 style="color:#e0aaff;">¡Hola ${name}!</h2>
          <p style="font-size:16px;">
            Gracias por ser parte de <strong>Cuatro Brujas</strong>.<br/>
            Aquí tienes tu <strong>código mágico</strong> para acceder a tu lectura:
          </p>
          <div style="background:#3d1747; padding:15px; border-radius:8px; margin:20px auto; display:inline-block;">
            <span style="font-size:24px; color:#ffd700; font-weight:bold;">${code}</span>
          </div>
          <p style="font-size:16px;">Haz clic en el botón para usarlo ahora:</p>
          <a href="https://cuatrobrujas.pe/viaje-mistico" 
             style="display:inline-block; background:#e0aaff; color:#1c1124; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold; margin-top:10px;">
            🔮 Ir a mi lectura
          </a>
          <p style="margin-top:30px; font-size:12px; color:#aaa;">© 2025 Cuatro Brujas | Hamburguesas y Magia a Domicilio</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return res.status(500).json({ error: "Error enviando el correo" });
  }
}