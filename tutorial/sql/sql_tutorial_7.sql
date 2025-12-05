use ql_sinhvien;

-- Tạo một STORED PROCEDURE có tên GetStudentCountByClass nhận một tham số đầu vào là class_code (kiểu VARCHAR) 
-- và một tham số đầu ra là student_count (kiểu INT). Thủ tục này sẽ trả về số lượng sinh viên thuộc lớp có mã class_code.
DELIMITER //
create procedure GetStudentCountByClass(in class_code varchar(10), out student_count int)
begin
select count(*) into student_count
from sinhvien
where malop= class_code;
end;
// DELIMITER ;

-- Gọi STORED PROCEDURE GetStudentCountByClass để lấy số lượng sinh viên thuộc lớp 'L001' và hiển thị kết quả.
call GetStudentCountByClass('L001', @count);
SELECT @count;

-- (Tùy chọn) Tạo một STORED PROCEDURE khác để thêm một sinh viên mới vào bảng sinhvien. Thủ tục này có thể nhận các 
-- tham số đầu vào cho mã sinh viên, họ tên, ngày sinh, địa chỉ và mã lớp.
DELIMITER //
create procedure add_sv(in masv varchar(10), hoten text, ngaysinh date, diachi text, malop varchar(10))
begin
insert into sinhvien
value(masv, hoten, ngaysinh, diachi, malop);
end;
// DELIMITER ;
-- Gọi STORED PROCEDURE bạn vừa tạo để thêm một sinh viên mới.
call add_sv('SV016','Tran Trung Nghia','2001-02-16','Hai Duong', 'L001');
select * from sinhvien;

-- Xem danh sách các STORED PROCEDURE trong cơ sở dữ liệu của bạn.
show procedure status;

-- Xóa STORED PROCEDURE GetStudentCountByClass.
drop procedure GetStudentCountByClass;