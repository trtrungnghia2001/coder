-- Bài tập: Thống kê và Lọc Dữ liệu Sinh viên theo Nhóm

-- Sử dụng các câu lệnh SELECT kết hợp với GROUP BY và HAVING để thực hiện các yêu cầu sau:

use quanly_sinhvien;

-- Đếm số lượng sinh viên trong mỗi lớp. Hiển thị cột lop và số lượng sinh viên tương ứng.

select lop, count(id) as soluongsinhvien
from sinhvien
group by lop;

-- Tìm lớp có nhiều hơn 5 sinh viên. Hiển thị cột lop và số lượng sinh viên của các lớp đó.

select lop, count(id) as soluongsinhvien
from sinhvien
group by lop
having count(id)>5;

-- Tính điểm trung bình của các sinh viên trong mỗi lớp. Hiển thị cột lop và điểm trung bình tương ứng.

select lop, avg(diem_trung_binh) as diemtrungbinh
from sinhvien
group by lop;

-- Tìm lớp có điểm trung bình của sinh viên lớn hơn 7.5. Hiển thị cột lop và điểm trung bình của các lớp đó.

select lop, avg(diem_trung_binh) as diemtrungbinh
from sinhvien
group by lop
having avg(diem_trung_binh)>7.5;

-- Tìm tuổi nhỏ nhất và lớn nhất của sinh viên trong mỗi lớp. Hiển thị cột lop, tuổi nhỏ nhất và tuổi lớn nhất tương ứng.

select lop, min(tuoi) as tuoi_nho_nhat, max(tuoi) as tuoi_lon_nhat
from sinhvien
group by lop;

-- Tìm lớp mà có ít nhất một sinh viên có điểm trung bình lớn hơn 9.0. Hiển thị cột lop.

select distinct lop
from sinhvien
where diem_trung_binh>9;

-- Đếm số lượng sinh viên có điểm trung bình dưới 6.0 trong mỗi lớp. Hiển thị cột lop và số lượng sinh viên tương ứng.

select lop, count(id) as so_luong_sv
from sinhvien
where diem_trung_binh<6
group by lop;

-- Tìm lớp mà có hơn 2 sinh viên có điểm trung bình dưới 6.0. Hiển thị cột lop và số lượng sinh viên tương ứng.

select lop, count(id) as so_luong_sv
from sinhvien
where diem_trung_binh<6
group by lop
having count(id) >2;

-- Tính số lượng sinh viên theo từng độ tuổi. Hiển thị cột tuoi và số lượng sinh viên tương ứng.

select tuoi, count(id) as so_luong_sv
from sinhvien
group by tuoi;

-- Tìm độ tuổi mà có nhiều hơn 3 sinh viên. Hiển thị cột tuoi và số lượng sinh viên tương ứng.

select tuoi, count(id) as so_luong_sv
from sinhvien
group by tuoi
having count(id)>3;