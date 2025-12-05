use ql_banhang;

-- Bài tập 1: Tính Tổng Các Số Chẵn (WHILE Loop - MySQL)
-- Viết một STORED PROCEDURE tên là TinhTongChan nhận một số nguyên n làm đầu vào. Sử dụng vòng lặp WHILE để 
-- tính tổng các số chẵn từ 2 đến n và trả về kết quả thông qua một tham số OUT tên là tong_chan.DELIMITER //
create procedure TinhTongChan (in n int, out tong_chan int) 
begin
	declare dem int default 0;
    declare tong int default 0;
  
	while dem<= n do 
		set tong = tong +dem;
        set dem = dem +2;
	end while;
    set tong_chan = tong;
end ;
// DELIMITER ;

call TinhTongChan(10 ,@tong_chan);
select @tong_chan;

-- Bài tập 2: Phân Loại Đơn Hàng (CASE trong SELECT)
-- Viết một câu lệnh SELECT trên bảng donhang (giả sử có cột tong_tien). Hiển thị madh, tong_tien, và một cột mới 
-- tên là loai_don_hang với giá trị:
-- 'Giá trị thấp' nếu tong_tien < 100.
-- 'Giá trị trung bình' nếu tong_tien >= 100 và tong_tien < 500.
-- 'Giá trị cao' nếu tong_tien >= 500.
-- (Gợi ý: Sử dụng searched CASE trong mệnh đề SELECT.)
CREATE TABLE donhang (
    madh INT PRIMARY KEY AUTO_INCREMENT,
    tong_tien DECIMAL(10, 2)
);

INSERT INTO donhang (tong_tien) VALUES
(50.00),
(120.00),
(600.00),
(300.00),
(80.00);

select madh, tong_tien, 
case 
when tong_tien < 100 then 'Giá trị thấp'
when tong_tien>=100 and tong_tien < 500 then 'Giá trị trung bình'
else 'Giá trị cao'
end as loai_don_hang
from donhang;

-- Bài tập 3: Kiểm Tra Trạng Thái Đơn Hàng (IF ELSE trong PROCEDURE - MySQL)
-- Tạo một STORED PROCEDURE tên là KiemTraTrangThaiDH nhận madh (mã đơn hàng) làm đầu vào. Bên trong thủ tục, truy vấn 
-- trạng thái của đơn hàng từ bảng donhang (giả sử có cột trang_thai là VARCHAR). Sử dụng câu lệnh IF ELSE để hiển thị thông báo:
ALTER TABLE donhang ADD COLUMN trang_thai VARCHAR(50);

UPDATE donhang SET trang_thai = 'Đang xử lý' WHERE madh IN (1, 4);
UPDATE donhang SET trang_thai = 'Đã giao' WHERE madh = 2;
UPDATE donhang SET trang_thai = 'Đã hủy' WHERE madh = 5;
UPDATE donhang SET trang_thai = NULL WHERE madh = 3;

DELIMITER //
CREATE PROCEDURE KiemTraTrangThaiDH(IN ma_dh INT)
BEGIN
    DECLARE trangthai_dh VARCHAR(50);
    SELECT trang_thai INTO trangthai_dh
    FROM donhang
    WHERE madh = ma_dh;

    IF trangthai_dh = 'Đang xử lý' THEN
        SELECT 'Đơn hàng đang được xử lý.';
    ELSEIF trangthai_dh = 'Đã giao' THEN
        SELECT 'Đơn hàng đã được giao.';
    ELSE
        SELECT 'Trạng thái đơn hàng không xác định.';
    END IF;
END //
DELIMITER ;

-- Để gọi thủ tục:
CALL KiemTraTrangThaiDH(1); -- Kết quả: 'Đơn hàng đang được xử lý.'
CALL KiemTraTrangThaiDH(2); -- Kết quả: 'Đơn hàng đã được giao.'
CALL KiemTraTrangThaiDH(3); -- Kết quả: 'Trạng thái đơn hàng không xác định.'
