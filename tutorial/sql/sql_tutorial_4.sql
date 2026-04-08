use ql_sinhvien;

-- Lấy thông tin của tất cả sinh viên thuộc lớp có sĩ số lớn nhất. (Sử dụng subquery để tìm malop của lớp có siso lớn nhất).
select *
from sinhvien join
(select * from lophoc order by siso desc limit 1) as lophoc_max
on sinhvien.malop=lophoc_max.malop;

-- Lấy danh sách tên của các lớp có ít nhất một sinh viên. (Sử dụng subquery với IN hoặc EXISTS).
select tenlop
from lophoc join
(select malop from lophoc where siso>0)as lophoc_sinhvien on lophoc.malop=lophoc_sinhvien.malop;

-- Lấy mã sinh viên và họ tên của những sinh viên có cùng lớp với sinh viên có mã 'SV001'. (Không bao gồm 'SV001' trong kết quả).
select sv.masv, sv.hoten
from sinhvien sv
where sv.malop= (select malop from sinhvien where masv='SV001');

-- Tạo một bảng tạm thời chứa danh sách các sinh viên sinh sau năm 2002 và sau đó truy vấn bảng tạm thời này để lấy họ tên và ngày sinh. 
-- (Sử dụng subquery trong FROM).
select *
from sinhvien sv join
(select * from sinhvien where year(ngaysinh)>2002) as sinhvien_sinhsau_2002 on sv.masv= sinhvien_sinhsau_2002.masv;

-- Hiển thị mã lớp và số lượng sinh viên trong mỗi lớp (tương tự bài tập trước), nhưng lần này sử dụng subquery trong mệnh đề SELECT 
-- để tính số lượng sinh viên cho mỗi lớp. 
-- (Gợi ý: Bạn có thể cần correlated subquery).
select lh.malop, 
(select count(*) from sinhvien sv where sv.malop=lh.malop) 
from lophoc lh;

