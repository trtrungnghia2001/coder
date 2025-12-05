import envConfig from "#src/configs/env";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.resolve(fileURLToPath(import.meta.url));
// Cấu hình transporter với thông tin SMTP của nhà cung cấp email của bạn
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.EMAIL_USER, // Email của bạn (từ đó email sẽ được gửi đi)
    pass: envConfig.EMAIL_PASSWORD, // Mật khẩu email của bạn hoặc App Password (đối với Gmail)
  },
  tls: {
    rejectUnauthorized: envConfig.IS_PRODUCTION,
  },
});

// Hàm chung để gửi email
export const sendEmail = async ({
  email,
  subject,
  templateName,
  templateData,
  text,
}) => {
  const templatePath = path.join(__dirname, "../../views", templateName);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Email template ${templateName} not found`);
  }

  const htmlContent = await ejs.renderFile(templatePath, templateData);

  // 3. Định nghĩa tùy chọn email
  const mailOptions = {
    from: `Your App <${envConfig.EMAIL_USER}>`, // Người gửi hiển thị
    to: email, // Email người nhận
    subject: subject, // Chủ đề email
    html: htmlContent, // Nội dung email dưới dạng HTML
    text: text, // Hoặc nội dung dưới dạng văn bản thuần
  };

  // 3. Gửi email
  await transporter.sendMail({ ...mailOptions });
};
export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    await sendEmail({
      email: email,
      subject: "Password Reset Request",
      templateName: "passwordReset.ejs", // Tên template
      templateData: { resetUrl }, // Dữ liệu truyền vào template
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email!");
  }
};
