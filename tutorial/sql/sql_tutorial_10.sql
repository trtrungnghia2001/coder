use ql_sinhvien;

-- Tạo một INDEX đơn trên cột malop.
create index index_malop
on lophoc (malop);

-- Tạo một INDEX duy nhất trên cột masv (khóa chính thường đã có unique index, nhưng hãy thử tạo lại nếu chưa có).
create index index_masv
on sinhvien (masv);

-- Tạo một composite INDEX trên các cột diachi và hoten.
create index index_diachi_hoten
on sinhvien (diachi,hoten);

-- Xem danh sách các INDEX đã được tạo trên bảng sinhvien.
show index from sinhvien;

-- Thử chạy một vài câu lệnh SELECT có mệnh đề WHERE sử dụng các cột mà bạn đã đánh chỉ mục và quan sát 
-- (nếu có công cụ) cách cơ sở dữ liệu sử dụng INDEX.
EXPLAIN SELECT * FROM sinhvien WHERE malop = 'L001';
EXPLAIN SELECT * FROM sinhvien WHERE masv = 'SV002';
EXPLAIN SELECT * FROM sinhvien WHERE diachi = 'Hà Nội' AND hoten LIKE 'N%';

-- Xóa các INDEX mà bạn đã tạo.
drop index index_masv on sinhvien;