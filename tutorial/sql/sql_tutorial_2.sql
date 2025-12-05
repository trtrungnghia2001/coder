use ql_sinhvien;
-- Đếm tổng số sinh viên trong bảng sinhvien.
select count(*) as tong_sv from sinhvien;

-- Đếm số lượng sinh viên có địa chỉ ở Hà Nội.
select count(*) as tong_sv from sinhvien where diachi='Hà Nội';

-- Tính số lượng sinh viên trong mỗi lớp (hiển thị malop và số lượng sinh viên).
select malop, count(*) as soluong_sv
from sinhvien
group by malop;

-- Tìm ngày sinh sớm nhất và muộn nhất của sinh viên.
select min(ngaysinh), max(ngaysinh)
from sinhvien;

-- Tính số lượng sinh viên trong mỗi lớp và chỉ hiển thị những lớp có hơn 2 sinh viên.
select malop, count(*) as soluong_sv
from sinhvien
group by malop
having count(*)>2;

-- (Nếu bạn đã thêm cột email ở bài tập trước) Đếm số lượng sinh viên có địa chỉ email 
-- (giả sử những sinh viên có email sẽ có giá trị không NULL ở cột email).