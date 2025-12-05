CREATE DATABASE ql_sinhvien;
USE ql_sinhvien;

CREATE TABLE lophoc (
	malop VARCHAR(10) PRIMARY KEY,
	tenlop TEXT NOT NULL,
	siso INTEGER
);

CREATE TABLE sinhvien (
    masv VARCHAR(10) PRIMARY KEY,
    hoten TEXT NOT NULL,
    ngaysinh DATE,
    diachi TEXT,
    malop VARCHAR(10),
    FOREIGN KEY (malop) REFERENCES lophoc(malop)
);

INSERT INTO lophoc (malop, tenlop, siso) VALUES
('L001', 'Toán', 30),
('L002', 'Văn', 35),
('L003', 'Anh', 28);

INSERT INTO sinhvien (masv, hoten, ngaysinh, diachi, malop) VALUES
('SV001', 'Nguyễn Văn A', '2003-05-15', 'Hà Nội', 'L001'),
('SV002', 'Trần Thị B', '2002-12-20', 'Hải Phòng', 'L002'),
('SV003', 'Lê Minh C', '2003-08-10', 'Đà Nẵng', 'L001'),
('SV004', 'Phạm Thu D', '2002-03-01', 'Hồ Chí Minh', 'L003'),
('SV005', 'Hoàng Ngọc E', '2003-11-25', 'Hà Nội', 'L002');

-- Lấy tất cả thông tin của tất cả sinh viên.
select * from sinhvien;

-- Lấy họ tên và ngày sinh của tất cả sinh viên.
select hoten, ngaysinh from sinhvien;

-- Lấy tất cả thông tin của sinh viên có địa chỉ ở Hà Nội.
select * from sinhvien where diachi="Hà Nội";

-- Lấy tất cả thông tin của sinh viên sinh sau ngày 01/01/2003.
select * from sinhvien where ngaysinh>"2003/01/01";

-- Lấy tất cả thông tin của sinh viên thuộc lớp có mã 'L001'.
select * from sinhvien where malop ='L001';

-- Lấy danh sách các lớp học (mã lớp và tên lớp).
select malop, tenlop from lophoc;

-- Lấy tất cả thông tin của sinh viên có họ bắt đầu bằng chữ 'N'. (Sử dụng LIKE)
select * from sinhvien where hoten like 'N%';

-- Thêm một sinh viên mới vào bảng sinhvien.
insert into sinhvien(masv, hoten, ngaysinh, diachi, malop) values
('SV006', 'Hoàng Ngọc F', '2005-11-25', 'Hà Nội', 'L002');

-- Cập nhật địa chỉ của sinh viên có mã 'SV003' thành 'Hồ Tây, Hà Nội'.
update sinhvien
set diachi='Hồ Tây, Hà Nội'
where masv='SV003';

-- Xóa sinh viên có mã 'SV005' khỏi bảng sinhvien.
delete from sinhvien
where masv='SV005';

-- Lấy danh sách tất cả sinh viên, sắp xếp theo họ tên (A-Z).
select * from sinhvien order by hoten asc;

-- Lấy 2 sinh viên đầu tiên trong danh sách sau khi sắp xếp theo ngày sinh (từ mới nhất đến cũ nhất).
select * from sinhvien order by ngaysinh desc;
