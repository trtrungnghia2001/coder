use ql_sinhvien;

-- Hiển thị họ và tên của tất cả sinh viên thành chữ hoa.
select upper(hoten)
from sinhvien;

-- Hiển thị năm sinh của tất cả sinh viên.
select year(ngaysinh)
from sinhvien;

-- Hiển thị độ dài tên của tất cả sinh viên.
select length(hoten)
from sinhvien;

-- Lấy danh sách tất cả sinh viên và chỉ hiển thị tháng sinh (dạng số).
select *, month(ngaysinh) as thangsinh
from sinhvien;

-- Nối mã sinh viên và họ tên của tất cả sinh viên, cách nhau bằng dấu gạch ngang ('-').
select concat(masv,'-',hoten)
from sinhvien;
