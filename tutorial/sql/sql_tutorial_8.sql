use ql_sinhvien;

-- Tạo một FUNCTION có tên GetFullName nhận hoten (kiểu TEXT) làm tham số đầu vào và trả về họ và tên viết hoa (kiểu TEXT). 
-- (Giả sử hoten chứa cả họ và tên).
DELIMITER //
create function GetFullName (hoten text)
returns text
deterministic
begin 
	return upper(hoten);
end ;

// DELIMITER ;

select GetFullName(hoten) from sinhvien;

-- (Tùy chọn) Tạo một FUNCTION khác để tính tuổi của sinh viên dựa trên ngaysinh. Hàm này có thể nhận ngaysinh (kiểu DATE) 
-- làm tham số và trả về tuổi (kiểu INT). (Lưu ý: Việc tính tuổi chính xác có thể phức tạp do sự khác biệt giữa năm sinh và ngày hiện tại).
DELIMITER //
create function tinhtuoi (ngaysinh date)
returns int
deterministic
begin 
	declare curr_date date default curdate();
    declare tuoi int default 0;
    
    if(month(curr_date)>month(ngaysinh)) then
		set tuoi = year(curdate()) - year(ngaysinh);
    elseif(month(curr_date)=month(ngaysinh) and day(curr_date)>=day(ngaysinh)) then
		set tuoi = year(curdate()) - year(ngaysinh);
	else
		set tuoi = year(curdate()) - year(ngaysinh) -1;
    end if;
    
	return tuoi;
    
end ;
// DELIMITER ;

-- Gọi FUNCTION tính tuổi để hiển thị mã sinh viên, họ tên và tuổi của tất cả sinh viên.
select * , tinhtuoi(ngaysinh) as tuoi from sinhvien;

-- Xem danh sách các hàm trong cơ sở dữ liệu của bạn.
SHOW FUNCTION STATUS;

-- Xóa FUNCTION GetFullName.
drop function GetFullName;