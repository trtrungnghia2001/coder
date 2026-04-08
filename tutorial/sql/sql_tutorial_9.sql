use ql_sinhvien;

-- Bật chế độ autocommit (nếu đang tắt).
SET autocommit = 1; -- Bật autocommit (1 là ON, 0 là OFF)

-- Thực hiện một vài câu lệnh INSERT hoặc UPDATE.
INSERT INTO sinhvien (masv, hoten) VALUES ('SV008', 'Nguyễn Văn Tám');
UPDATE sinhvien SET diachi = 'Sài Gòn' WHERE masv = 'SV004';
SELECT * FROM sinhvien WHERE masv IN ('SV008', 'SV004');

-- Bắt đầu một giao dịch (START TRANSACTION hoặc BEGIN).
START TRANSACTION;

-- Thực hiện một vài câu lệnh INSERT hoặc UPDATE khác.
INSERT INTO sinhvien (masv, hoten) VALUES ('SV009', 'Lê Thị Chín');
UPDATE sinhvien SET malop = 'L002' WHERE masv = 'SV008';

-- Kiểm tra dữ liệu (trong một phiên kết nối khác nếu có thể) để xem các thay đổi đã được thực hiện chưa.
SELECT * FROM sinhvien WHERE masv IN ('SV009', 'SV008');

-- Thực hiện ROLLBACK.
ROLLBACK;

-- Kiểm tra lại dữ liệu để xác nhận rằng các thay đổi trong giao dịch đã bị hủy bỏ.
SELECT * FROM sinhvien WHERE masv IN ('SV009', 'SV008');

-- Bắt đầu một giao dịch khác.
START TRANSACTION;

-- Thực hiện một vài thay đổi.
INSERT INTO sinhvien (masv, hoten) VALUES ('SV010', 'Phan Văn Mười');
UPDATE sinhvien SET diachi = 'Cần Thơ' WHERE masv = 'SV002';

-- Thực hiện COMMIT.
COMMIT;

-- Kiểm tra dữ liệu để xác nhận rằng các thay đổi đã được lưu.
SELECT * FROM sinhvien WHERE masv IN ('SV010', 'SV002');