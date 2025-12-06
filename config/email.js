const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(to, name, otp) {
  const html = `
  <html>
    <body style="font-family: Arial; background:#f4f7ff; padding:20px">
      <div style="max-width:480px; margin:auto; background:white; border-radius:12px; padding:25px; box-shadow:0 0 20px rgba(0,0,0,0.05)">
        <h2 style="color:#1E88E5; margin-top:0">Verify Your Email</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>Use the OTP below to verify your email. It is valid for 10 minutes.</p>

        <div style="font-size:28px; font-weight:bold; letter-spacing:8px; text-align:center; margin:25px 0; padding:15px; background:#e8f1ff; border-radius:8px;">
          ${otp}
        </div>

        <p>If you didn't request this, ignore this email.</p>
        <br>
        <p>Regards,<br><b>E-Commerce Team</b></p>
      </div>
    </body>
  </html>
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your OTP Code",
    html,
  });
}

module.exports = sendOtpEmail;
