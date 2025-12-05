use ql_sinhvien;

-- Chạy lệnh EXPLAIN trên một vài truy vấn SELECT phức tạp của bạn và cố gắng hiểu kế hoạch thực thi.
explain select *
from sinhvien sv join lophoc lh on sv.malop=lh.malop
where sv.hoten like 'N%'
order by diachi desc;

-- Xác định xem các truy vấn đó có đang sử dụng index một cách hiệu quả hay không.
-- Thử tạo index trên các cột mà bạn nghĩ sẽ cải thiện hiệu suất của các truy vấn đó.
create index idx_hoten on sinhvien (hoten);

-- Chạy lại EXPLAIN sau khi tạo index để xem kế hoạch thực thi có thay đổi không.
explain select *
from sinhvien sv join lophoc lh on sv.malop=lh.malop
where sv.hoten like 'N%'
order by diachi desc;

-- Thử viết lại một truy vấn chậm theo một cách khác (ví dụ: thay thế subquery bằng join) 
-- và so sánh hiệu suất bằng cách sử dụng EXPLAIN hoặc các công cụ đo hiệu suất khác.
-- (Nếu có quyền) Xem xét các tham số cấu hình của RDBMS của bạn.