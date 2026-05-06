import nodemailer from "nodemailer";

interface SendEmailValues {
  to: string;
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // استدعاء البيانات من ملف .env
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail({ to, subject, text }: SendEmailValues) {
  try {
    const info = await transporter.sendMail({
      // استخدام المتغير هنا أيضاً
      from: `"عطاء" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
    });
    
    console.log("Email sent successfully:", info.messageId);
    return { success: true };
  } catch (err) {
    console.error("Gmail SMTP Error:", err);
    return { success: false, error: err };
  }
}