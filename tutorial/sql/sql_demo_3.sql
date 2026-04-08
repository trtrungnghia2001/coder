-- Bài tập: Kết hợp Dữ liệu Sinh viên và Điểm số

use quanly_sinhvien;

-- 1. Thêm một bảng có tên là diemso
-- id_sinhvien INT,
-- ma_monhoc VARCHAR(10),
-- diem_thi FLOAT,
-- ngay_thi DATE,
-- FOREIGN KEY (id_sinhvien) REFERENCES sinhvien(id)

CREATE TABLE diemso (
    id_sinhvien INT,
    ma_monhoc VARCHAR(10),
    diem_thi FLOAT,
    ngay_thi DATE,
    FOREIGN KEY (id_sinhvien) REFERENCES sinhvien(id)
);

-- 2. Hãy thêm một vài bản ghi vào bảng diemso

INSERT INTO diemso (id_sinhvien, ma_monhoc, diem_thi, ngay_thi) VALUES
(1, 'TOAN101', 8.5, '2025-05-15'),
(2, 'VAN101', 7.9, '2025-05-16'),
(1, 'LY101', 9.2, '2025-05-17'),
(3, 'TOAN101', 6.5, '2025-05-15'),
(2, 'SU101', 8.8, '2025-05-18');

-- 3. Sử dụng câu lệnh JOIN để thực hiện các truy vấn sau:

-- a.  Hiển thị tên của sinh viên và điểm thi của họ trong tất cả các môn học. (Sử dụng INNER JOIN).

select a.ten, b.diem_thi from sinhvien a inner join diemso b on a.id=b.id_sinhvien;

-- b.  Hiển thị tên của tất cả sinh viên và điểm thi của họ trong môn 'TOAN101' (nếu có). 
-- Nếu sinh viên nào chưa có điểm môn 'TOAN101', vẫn hiển thị tên của họ và để trống cột điểm. (Sử dụng LEFT JOIN).

select a.ten, b.diem_thi as TOAN101 
from sinhvien a left join diemso b on a.id=b.id_sinhvien and b.ma_monhoc='TOAN101';

-- c.  Hiển thị tên của sinh viên và mã môn học mà họ đã thi trong tháng 5 năm 2025.

select a.ten, b.ma_monhoc, b.diem_thi
from sinhvien a inner join diemso b on a.id=b.id_sinhvien
where month(b.ngay_thi)=5 and year(b.ngay_thi);

-- d.  Hiển thị tên của sinh viên và điểm thi môn 'VAN101' của họ, sắp xếp theo điểm thi giảm dần.

select a.ten, b.diem_thi as VAN101
from sinhvien a inner join diemso b on a.id=b.id_sinhvien
order by diem_thi desc;

-- e.  Đếm số lượng điểm thi mà mỗi sinh viên đã có. Hiển thị tên sinh viên và số lượng điểm thi.

select a.ten, count(b.diem_thi) as soluong_diemthi
from sinhvien a inner join diemso b on a.id=b.id_sinhvien
group by a.ten;