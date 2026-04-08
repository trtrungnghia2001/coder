create database ql_banhang;
use ql_banhang;
-- Bảng sanpham
CREATE TABLE sanpham (
    masp VARCHAR(10) PRIMARY KEY,
    tensp VARCHAR(255),
    soluongton INT,
    gia DECIMAL(10, 2)
);

INSERT INTO sanpham (masp, tensp, soluongton, gia) VALUES
('SP001', 'Bàn gỗ', 10, 150.00),
('SP002', 'Ghế nhựa', 50, 25.00),
('SP003', 'Tủ sách', 5, 200.00);

-- Bảng donhang_chitiet
CREATE TABLE donhang_chitiet (
    madh INT,
    masp VARCHAR(10),
    soluong INT,
    gia_ban DECIMAL(10, 2),
    PRIMARY KEY (madh, masp),
    FOREIGN KEY (masp) REFERENCES sanpham(masp)
);

-- Bảng lichsu_gia_sanpham
CREATE TABLE lichsu_gia_sanpham (
    id INT AUTO_INCREMENT PRIMARY KEY,
    masp VARCHAR(10),
    gia_cu DECIMAL(10, 2),
    gia_moi DECIMAL(10, 2),
    thoi_gian TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (masp) REFERENCES sanpham(masp)
);

-- Bài tập 1: Cập Nhật Số Lượng Tồn Kho (INSERT)

-- Tạo một trigger tên capnhat_tonkho_insert trên bảng donhang_chitiet (AFTER INSERT). Khi một sản phẩm được thêm vào đơn hàng, 
-- hãy giảm soluongton tương ứng trong bảng sanpham.
DELIMITER // 
create trigger capnhat_tonkho_insert
after insert 
on donhang_chitiet
for each row
begin
	update sanpham
	set soluongton = soluongton - new.soluong
	where masp=new.masp;
end;
//DELIMITER ;

-- Bài tập 2: Cập Nhật Số Lượng Tồn Kho (DELETE)

-- Tạo một trigger tên capnhat_tonkho_delete trên bảng donhang_chitiet (AFTER DELETE). Khi một sản phẩm bị xóa khỏi đơn hàng, 
-- hãy tăng soluongton tương ứng trong bảng sanpham.
DELIMITER // 
create trigger capnhat_tonkho_delete
after delete 
on donhang_chitiet
for each row
begin
	update sanpham
	set soluongton = soluongton + old.soluong
	where masp=old.masp;
end;
//DELIMITER ;

-- Bài tập 3: Ghi Lịch Sử Giá Sản Phẩm (UPDATE)

-- Tạo một trigger tên ghi_lichsu_gia trên bảng sanpham (AFTER UPDATE OF gia). Khi giá của một sản phẩm thay đổi, hãy ghi 
-- lại masp, gia_cu, gia_moi, và thoi_gian vào bảng lichsu_gia_sanpham.
DELIMITER //
CREATE TRIGGER ghi_lichsu_gia
AFTER UPDATE ON sanpham
FOR EACH ROW
BEGIN
    IF OLD.gia <> NEW.gia THEN
        INSERT INTO lichsu_gia_sanpham (masp, gia_cu, gia_moi)
        VALUES (NEW.masp, OLD.gia, NEW.gia);
    END IF;
END //
DELIMITER ;

-- Bài tập 4: Ngăn Chặn Đặt Hàng Quá Tồn Kho (UPDATE)

-- Sửa đổi trigger kiem_tra_ton_kho (hoặc tạo một trigger mới tên kiem_tra_tonkho_update trên BEFORE UPDATE của donhang_chitiet) 
-- để kiểm tra số lượng sản phẩm sau khi cập nhật đơn hàng. Nếu số lượng mới vượt quá tồn kho, ngăn chặn cập nhật.
DELIMITER //
CREATE TRIGGER kiem_tra_tonkho_update
BEFORE UPDATE ON donhang_chitiet
FOR EACH ROW
BEGIN
    DECLARE tonkho INT;
    SELECT soluongton INTO tonkho
    FROM sanpham
    WHERE masp = NEW.masp;

    IF NEW.soluong > tonkho THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Số lượng đặt vượt quá số lượng tồn kho.';
    END IF;
END //
DELIMITER ;

-- Bài tập 5: Xóa Đơn Hàng Chi Tiết Khi Xóa Sản Phẩm

-- Tạo một trigger tên xoa_donhang_chitiet_sp trên bảng sanpham (BEFORE DELETE). Khi một sản phẩm bị xóa khỏi bảng sanpham, 
-- hãy xóa tất cả các bản ghi liên quan đến sản phẩm đó trong bảng donhang_chitiet. (Cẩn thận với trigger BEFORE DELETE, 
-- hãy đảm bảo bạn hiểu rõ tác động của nó).
DELIMITER //
CREATE TRIGGER xoa_donhang_chitiet_sp
BEFORE DELETE ON sanpham
FOR EACH ROW
BEGIN
    DELETE FROM donhang_chitiet
    WHERE masp = OLD.masp;
END //
DELIMITER ;