use ql_sinhvien;

-- Tạo một người dùng mới.
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'test_password';

-- Cấp quyền SELECT trên bảng sinhvien cho người dùng mới này.
GRANT SELECT ON ql_sinhvien.sinhvien TO 'test_user'@'localhost';

-- Thử kết nối đến cơ sở dữ liệu bằng tài khoản người dùng mới và thực hiện một truy vấn SELECT trên bảng sinhvien.

-- Database -> Connect to Database
-- Hostname/Server: localhost (hoặc địa chỉ server của bạn)
-- Port: (thường là 3306 cho MySQL)
-- Username: test_user
-- Password: test_password
-- Default Schema/Database: your_database_name

SELECT * FROM sinhvien;
-- Thử thực hiện một thao tác khác (ví dụ: INSERT) bằng tài khoản người dùng mới và quan sát xem bạn có được phép không.
INSERT INTO sinhvien (masv, hoten) VALUES ('TU001', 'Test User');

-- Thu hồi quyền SELECT từ người dùng mới.
REVOKE SELECT ON ql_sinhvien.sinhvien FROM 'test_user'@'localhost';
FLUSH PRIVILEGES; -- Sau khi thu hồi, hãy làm mới quyền (flush privileges) để các thay đổi có hiệu lực ngay lập tức

-- Xóa người dùng bạn đã tạo.
DROP USER 'test_user'@'localhost';