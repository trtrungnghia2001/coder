use ql_sinhvien;

-- Tạo một VIEW có tên là v_danhsach_sinhvien chứa mã sinh viên, họ tên và tên lớp của tất cả sinh viên. 
-- (Sử dụng INNER JOIN để kết hợp hai bảng).
create view v_danhsach_sinhvien
as
select masv, hoten, tenlop
from sinhvien join lophoc on sinhvien.malop=lophoc.malop;

-- Truy vấn VIEW v_danhsach_sinhvien để lấy danh sách tất cả sinh viên và tên lớp của họ.
select *
from v_danhsach_sinhvien;

-- Tạo một VIEW có tên là v_sinhvien_hanoi chỉ chứa thông tin (tất cả cột) của các sinh viên có địa chỉ ở Hà Nội.
create view v_sinhvien_hanoi
as
select *
from sinhvien 
where diachi="Hà Nội";

-- Truy vấn VIEW v_sinhvien_hanoi để xem danh sách sinh viên ở Hà Nội.
select *
from v_sinhvien_hanoi;

-- Thử tạo một VIEW phức tạp hơn, ví dụ như v_soluong_sinhvien_moi_lop chứa mã lớp và số lượng sinh viên trong mỗi lớp 
-- (sử dụng GROUP BY và COUNT).
create view v_soluong_sinhvien_moi_lop
as
select malop, count(*)
from sinhvien
group by malop;

-- Truy vấn VIEW v_soluong_sinhvien_moi_lop để xem số lượng sinh viên trong mỗi lớp.
select *
from v_soluong_sinhvien_moi_lop;

-- (Tùy chọn) Thử sửa đổi một trong các VIEW bạn đã tạo (nếu RDBMS bạn dùng hỗ trợ ALTER VIEW).
alter view v_soluong_sinhvien_moi_lop
as
select lh.*, lop_sv.soluong
from lophoc lh join 
(select malop, count(*) as soluong from sinhvien group by malop) as lop_sv on lh.malop=lop_sv.malop;

-- Xóa một trong các VIEW bạn đã tạo.
drop view v_soluong_sinhvien_moi_lop;