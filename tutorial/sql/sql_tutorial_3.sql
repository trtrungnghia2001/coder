use ql_sinhvien;
-- Lấy danh sách tất cả sinh viên và tên lớp mà họ thuộc về (sử dụng INNER JOIN). Hiển thị hoten từ sinhvien và tenlop từ lophoc.
select hoten, tenlop
from sinhvien join lophoc on sinhvien.malop= lophoc.malop;

-- Lấy danh sách tất cả sinh viên và tên lớp của họ. Nếu sinh viên chưa được gán lớp, 
-- vẫn hiển thị tên sinh viên nhưng cột tên lớp để NULL (sử dụng LEFT JOIN).
select hoten, tenlop
from sinhvien left join lophoc on sinhvien.malop= lophoc.malop;

-- Lấy danh sách tất cả các lớp học và số lượng sinh viên trong mỗi lớp. Nếu lớp nào chưa có sinh viên, 
-- vẫn hiển thị tên lớp nhưng cột số lượng sinh viên để NULL (sử dụng LEFT JOIN hoặc RIGHT JOIN). 
-- (Gợi ý: Bạn có thể cần sử dụng COUNT() kết hợp với GROUP BY).
select tenlop, count(*) as soluong_sv
from lophoc lh left join sinhvien sv on lh.malop=sv.malop
group by lh.malop;

-- Thử thực hiện CROSS JOIN giữa sinhvien và lophoc và quan sát kết quả.
select *
from lophoc lh cross join sinhvien sv;