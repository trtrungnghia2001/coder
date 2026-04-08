# Backend base setup

Framework: Nodejs, Nestjs

## 1. Cấu trúc thư mục (Project Structure)

Mỗi dự án sẽ có 1 cách tổ chức khác nhau, vào source để xem chi tiết

## 🔐 2. Luồng Xác thực & Phân quyền (Authentication & Authorization)

Hệ thống sử dụng cơ chế xác thực kép (Hybrid), thống nhất quản lý phiên làm việc qua JWT (JSON Web Token) được lưu trữ an toàn trong Cookie.

**🔴 2.1. Luồng Google OAuth2**

Dành cho đăng nhập nhanh qua tài khoản Google.

1. Client gọi tới `GET /auth/google`.

2. Server chuyển hướng người dùng tới trang đăng nhập của Google.

3. Google xác thực thành công và trả về profile cho Server.

4. Server kiểm tra Database:
   - Chưa có: Signup (Tạo user mới).

   - Đã có: Signin.

5. Client gọi tới `GET /auth/passport/success` để nhận về thông tin User và Token.

**🔵 2.2. Luồng Login truyền thống (Username/Password)**

1. Client gọi tới POST /auth/login.

2. Server kiểm tra thông tin đăng nhập trong DB:
   - Sai thông tin: Trả về lỗi 401 Unauthorized.

   - Đúng thông tin: Trả về thông tin User và cấp phát bộ đôi Token.

**🔑 2.3. Quản lý Phiên làm việc (Session Handling)**

Hệ thống sử dụng cơ chế Stateless với bộ đôi Token:

1. Access Token:
   - Thời hạn: Ngắn (15 phút).

   - Lưu trữ: Tự động ghi vào Cookie (httpOnly: true) và gửi kèm phản hồi cho Client.

2. Refresh Token:
   - Thời hạn: Dài (7 ngày).

   - Lưu trữ: Ghi vào Cookie và đồng thời lưu vào Redis để quản lý trạng thái (Revoke khi cần).

Ghi chú: Do Token được lưu trong Cookie `(httpOnly)`, trình duyệt sẽ tự động gửi kèm Token trong Header của mỗi Request. Việc đính kèm `Authorization: Bearer <token>` là không bắt buộc nhưng hệ thống vẫn hỗ trợ cho các thiết bị di động (Mobile App).

## 🛠️ 3. Các thành phần kỹ thuật cốt lõi (Core Components)

**📝 3.1. Hệ thống Nhật ký (Logging System)**

Sử dụng giải pháp ghi log đa tầng để đảm bảo khả năng giám sát:

- Audit Log (Middleware): Tự động ghi lại Method, URL, IP, StatusCode và thời gian phản hồi cho mỗi request.

- Error Log (Daily Rotate): Tự động tách lỗi nghiêm trọng ra file riêng (error-%DATE%.log) kèm theo stack trace để phục vụ debug.

- Combined Log: Ghi lại toàn bộ dòng chảy hoạt động của hệ thống theo ngày.

**🛡️ 3.2. Kiểm soát & Ép kiểu dữ liệu (Validation & Transformation)**

- Validation: Chặn đứng dữ liệu không hợp lệ ngay tại cửa ngõ bằng các quy tắc nghiêm ngặt (Whitelist).

- Transformation: Tự động chuyển đổi kiểu dữ liệu từ chuỗi (JSON) sang các đối tượng logic (ví dụ: String sang Date, Number) để đảm bảo tính toán chính xác.

**📤 3.3. Quản lý Media (Media Handling)**

- Async Cloud Upload: Đẩy tệp tin lên dịch vụ lưu trữ đám mây.

- Clean-up Logic: Luôn thực hiện xóa tài nguyên cũ khi có hành động cập nhật hoặc xóa dữ liệu để tối ưu dung lượng.

**⚙️ 3.4. Xử lý lỗi tập trung (Global Exception Filter)**

Mọi lỗi phát sinh đều được quy về một định dạng JSON duy nhất, giúp Frontend xử lý thông báo lỗi một cách thống nhất

## 🚀 4. Vận hành & Bảo trì

Documentation: Tự động hóa tài liệu API (Swagger/Postman) tại đường dẫn `/api/v1/document`.

Environment: Phân tách rõ ràng cấu hình giữa các môi trường Development, Staging và Production.
