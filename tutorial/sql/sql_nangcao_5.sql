-- Bài tập 5: Các thao tác nâng cao khác

-- Dựa trên cơ sở dữ liệu quanly_banhang, hãy thực hiện các truy vấn sau:
use quanly_banhang;

-- Tạo một view tên là khachhang_da_dat_hang chứa tên và email của những khách hàng đã đặt ít nhất một đơn hàng.
create view khachhang_da_dat_hang
as
select ten_khachhang, email
from khachhang;

-- Hiển thị tất cả dữ liệu từ view khachhang_da_dat_hang.
select * from khachhang_da_dat_hang;

-- Tạo một stored procedure tên là lay_don_hang_theo_trang_thai nhận một tham số đầu vào là trạng thái đơn 
-- hàng và trả về tất cả các đơn hàng có trạng thái đó.
DELIMITER //
create procedure lay_don_hang_theo_trang_thai(in trang_thai_don varchar(20))
begin
	select * from donhang where trang_thai=trang_thai_don;
end //
DELIMITER ;

-- Gọi stored procedure lay_don_hang_theo_trang_thai để lấy tất cả các đơn hàng có trạng thái là 'Đã giao'.
call lay_don_hang_theo_trang_thai('Đã giao');

-- Tạo một index trên cột email của bảng khachhang.
create index idx_email on khachhang(email);

-- Sử dụng câu lệnh EXPLAIN để xem kế hoạch thực thi của một truy vấn tìm kiếm khách hàng theo email.
explain select * from khachhang where email="b@example.com"

-- Thực hiện một transaction để thêm một khách hàng mới và đồng thời tạo một đơn hàng mới cho khách hàng đó. 
-- Nếu có lỗi xảy ra ở bất kỳ bước nào, rollback transaction. 
-- (Bạn chỉ cần mô tả các bước SQL, không cần thực thi thực tế nếu không có môi trường).
start transaction;
-- 1. tao khachhang
insert into khachhang (ten_khachhang, email, so_dien_thoai, dia_chi)
VALUES ('Khách Hàng Mới', 'moi@example.com', '0999888777', 'Địa chỉ mới');
-- 2. lay id 
SELECT @ma_khachhang_moi := last_insert_id();
-- 3. tao donhang
INSERT INTO donhang (ma_khachhang, ngay_dat_hang, tong_tien, trang_thai)
VALUES (@ma_khachhang_moi, CURDATE(), 100.00, 'Đang xử lý');
-- 4. Nếu không có lỗi xảy ra, commit transaction
COMMIT;
-- 5. Nếu có lỗi xảy ra
rollback;

-- Sử dụng window function để hiển thị tên khách hàng, mã đơn hàng và tổng tiền của từng đơn hàng, cùng với tổng số tiền mà khách hàng 
-- đó đã chi tiêu (tính trên tất cả các đơn hàng của họ).
select ten_khachhang, ma_donhang, tong_tien, sum(tong_tien) over (partition by kh.ma_khachhang) as tong_tien_kh
from khachhang kh join donhang dh on kh.ma_khachhang=dh.ma_khachhang;

-- Sử dụng window function để xếp hạng các đơn hàng của mỗi khách hàng theo tổng tiền giảm dần. Hiển thị tên khách hàng, mã đơn hàng, 
-- tổng tiền và thứ hạng.
select kh.ten_khachhang, dh.ma_donhang, dh.tong_tien as a, 
	rank() over (partition by kh.ma_khachhang order by dh.tong_tien desc) as thu_hang
from khachhang kh join donhang dh on kh.ma_khachhang=dh.ma_khachhang;

-- Tạo một trigger để tự động cập nhật trường tong_tien của bảng donhang khi có sự thay đổi (ví dụ: thêm, sửa, xóa) các mục hàng 
-- trong một bảng chi tiết đơn hàng (giả sử có một bảng chitiet_donhang với các cột ma_donhang, so_luong, don_gia). 
-- (Bạn chỉ cần mô tả cấu trúc trigger và logic, không cần tạo bảng chitiet_donhang và dữ liệu nếu không có môi trường).
DELIMITER //
create trigger capnhat_tongtien 
after insert on chitiet_donhang
for each row
begin
	UPDATE donhang
    SET tong_tien = tong_tien + (NEW.so_luong * NEW.don_gia)
    WHERE ma_donhang = NEW.ma_donhang;
end
// DELIMITER ;

DELIMITER //
create trigger capnhat_tongtien 
after update on chitiet_donhang
for each row
begin
	UPDATE donhang
    SET tong_tien = (
		select sum(ctdh.so_luong * ctdh.don_gia)
		from chitiet_donhang ctdh
		where ctdh.ma_donhang = New.ma_donhang
    )
    where ma_donhang = New.ma_donhang;
end
// DELIMITER ;

DELIMITER //
create trigger capnhat_tongtien 
after delete on chitiet_donhang
for each row
begin
	UPDATE donhang
     SET tong_tien = (
		select sum(ctdh.so_luong * ctdh.don_gia)
		from chitiet_donhang ctdh
		where ctdh.ma_donhang = New.ma_donhang
    )
    WHERE ma_donhang = NEW.ma_donhang;
end
// DELIMITER ;