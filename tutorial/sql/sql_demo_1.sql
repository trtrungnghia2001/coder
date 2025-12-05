-- Bài tập: Quản lý Danh sách Sinh viên

-- 1. Tạo một cơ sở dữ liệu có tên là quanly_sinhvien.

create database quanly_sinhvien;

-- 2. Sử dụng cơ sở dữ liệu quanly_sinhvien.

use quanly_sinhvien;

-- 3. Tạo một bảng có tên là sinhvien với các cột sau:
-- 	id (INT, khóa chính, tự động tăng)
-- 	ten (VARCHAR(50), không được để trống)
-- 	tuoi (INT)
-- 	lop (VARCHAR(10))
-- 	diem_trung_binh (FLOAT)

create table sinhvien(
id int auto_increment primary key,
ten varchar(50) not null,
tuoi int,
lop varchar(10),
diem_trung_binh float
);
-- 4. Thêm (INSERT) ít nhất 5 bản ghi sinh viên vào bảng sinhvien với các thông tin khác nhau.

INSERT INTO sinhvien (ten, tuoi, lop, diem_trung_binh) VALUES
('Nguyen Van A', 19, 'K64A', 7.8),
('Tran Thi B', 20, 'K63B', 8.2),
('Le Hoang C', 18, 'K65C', 6.5),
('Pham Thu D', 21, 'K62A', 9.0),
('Hoang Minh E', 19, 'K64C', 7.0),
('Do Ngoc F', 20, 'K63A', 8.5),
('Bui Xuan G', 18, 'K65B', 6.0),
('Dang Thanh H', 22, 'K61A', 9.2),
('Vu Kim I', 19, 'K64B', 7.5),
('Ngo Thuy K', 20, 'K63C', 8.0),
('Phan Duc L', 18, 'K65A', 6.8),
('Truong My M', 21, 'K62B', 8.8),
('Ly Tuan N', 19, 'K64A', 7.2),
('Ha Vi O', 20, 'K63B', 8.3),
('Dinh Hung P', 18, 'K65C', 6.3),
('Cao Thi Q', 22, 'K61B', 9.1),
('Lam Van R', 19, 'K64C', 7.1),
('Mai Ngoc S', 20, 'K63A', 8.6),
('Khong Minh T', 18, 'K65B', 6.1),
('Quach Anh U', 21, 'K62A', 8.9),
('Doan Gia V', 19, 'K64B', 7.6),
('Sam Tuyet X', 20, 'K63C', 8.1),
('Ton That Y', 18, 'K65A', 6.7),
('Bach Khoa Z', 22, 'K61A', 9.3),
('Ung Hoang AA', 19, 'K64A', 7.9),
('Che Linh BB', 20, 'K63B', 8.4),
('Dieu Thuyen CC', 18, 'K65C', 6.4),
('Giang Ca DD', 21, 'K62B', 8.7),
('Kieu Ngan EE', 19, 'K64C', 7.3),
('Man Mac FF', 20, 'K63A', 8.2);

-- 5. Hiển thị (SELECT) tất cả thông tin của tất cả sinh viên trong bảng.

select * from  sinhvien;

-- 6. Hiển thị (SELECT) tên và lớp của những sinh viên có tuổi lớn hơn 20.

select ten, lop from sinhvien where tuoi >20;

-- 7. Cập nhật (UPDATE) điểm trung bình của sinh viên có id là 3 lên thành 8.5.

update sinhvien set diem_trung_binh=8.5 where id=3;

-- 8. Hiển thị (SELECT) tất cả thông tin của sinh viên có id là 3 để kiểm tra xem điểm đã được cập nhật chưa.

select * from sinhvien where id=3;

-- 9. Xóa (DELETE) sinh viên có điểm trung bình dưới 5.

delete from sinhvien where diem_trung_binh<5;

-- 10. Hiển thị (SELECT) tất cả thông tin của tất cả sinh viên còn lại trong bảng để xem kết quả sau khi xóa.

select * from sinhvien;






