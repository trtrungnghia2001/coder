create database quanly_banhang;

use quanly_banhang;

CREATE TABLE khachhang (
    ma_khachhang INT PRIMARY KEY AUTO_INCREMENT,
    ten_khachhang VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    so_dien_thoai VARCHAR(20),
    dia_chi VARCHAR(255)
);
INSERT INTO khachhang (ten_khachhang, email, so_dien_thoai, dia_chi) VALUES
('Nguyen Van A', 'a@example.com', '0901234567', 'Hà Nội'),
('Tran Thi B', 'b@example.com', '0912345678', 'Hồ Chí Minh'),
('Le Hoang C', 'c@example.com', '0923456789', 'Hà Nội'),
('Pham Thu D', 'd@example.com', '0934567890', 'Đà Nẵng'),
('Hoang Minh E', 'e@example.com', '0945678901', 'Hà Nội'),
('Do Ngoc F', 'f@example.com', '0956789012', 'Hồ Chí Minh'),
('Bui Xuan G', 'g@example.com', '0967890123', 'Hải Phòng'),
('Dang Thanh H', 'h@example.com', '0978901234', 'Hà Nội'),
('Vu Kim I', 'i@example.com', '0989012345', 'Đà Nẵng'),
('Ngo Thuy K', 'k@example.com', '0990123456', 'Hồ Chí Minh'),
('Phan Duc L', 'l@example.com', '0801234567', 'Hà Nội'),
('Truong My M', 'm@example.com', '0812345678', 'Huế'),
('Ly Tuan N', 'n@example.com', '0823456789', 'Hà Nội'),
('Ha Vi O', 'o@example.com', '0834567890', 'Hồ Chí Minh'),
('Dinh Hung P', 'p@example.com', '0845678901', 'Hà Nội');

CREATE TABLE donhang (
    ma_donhang INT PRIMARY KEY AUTO_INCREMENT,
    ma_khachhang INT,
    ngay_dat_hang DATE NOT NULL,
    tong_tien DECIMAL(10, 2),
    trang_thai VARCHAR(20),
    FOREIGN KEY (ma_khachhang) REFERENCES khachhang(ma_khachhang)
);
INSERT INTO donhang (ma_khachhang, ngay_dat_hang, tong_tien, trang_thai) VALUES
(1, '2024-01-15', 120.50, 'Đã giao'),
(2, '2024-02-20', 85.00, 'Đang xử lý'),
(1, '2024-03-10', 250.75, 'Đã giao'),
(4, '2024-03-25', 55.20, 'Đang giao'),
(3, '2024-04-01', 150.00, 'Đã giao'),
(2, '2024-04-18', 92.80, 'Đang xử lý'),
(5, '2024-05-05', 210.40, 'Đã giao'),
(1, '2024-05-22', 78.90, 'Đang giao'),
(7, '2024-06-10', 300.00, 'Đã giao'),
(4, '2024-06-28', 62.50, 'Đang xử lý'),
(3, '2024-07-15', 180.90, 'Đã giao'),
(6, '2024-08-01', 110.25, 'Đang giao'),
(8, '2024-08-18', 280.60, 'Đã giao'),
(5, '2024-09-05', 95.15, 'Đang xử lý'),
(10, '2024-09-22', 165.80, 'Đã giao');

CREATE TABLE danhmuc (
    ma_danhmuc INT PRIMARY KEY AUTO_INCREMENT,
    ten_danhmuc VARCHAR(50) NOT NULL
);

INSERT INTO danhmuc (ten_danhmuc) VALUES
('Laptop'),
('Điện thoại'),
('Máy tính bảng'),
('Phụ kiện máy tính'),
('Màn hình'),
('Âm thanh'),
('Lưu trữ'),
('Thiết bị ngoại vi'),
('Máy in'),
('Mạng'),
('Ghế Gaming'),
('Linh kiện PC');

CREATE TABLE sanpham (
    ma_sanpham INT PRIMARY KEY AUTO_INCREMENT,
    ten_sanpham VARCHAR(255) NOT NULL,
    mo_ta TEXT,
    gia DECIMAL(10, 2) NOT NULL,
    so_luong_ton INT DEFAULT 0,
    ma_danhmuc INT,
    FOREIGN KEY (ma_danhmuc) REFERENCES danhmuc(ma_danhmuc) -- Giả sử có bảng danhmuc
);
INSERT INTO sanpham (ten_sanpham, mo_ta, gia, so_luong_ton, ma_danhmuc) VALUES
('Laptop Dell XPS 13', 'Màn hình 13 inch, Core i7, 16GB RAM, 512GB SSD', 1500.00, 10, 1),
('Smartphone Samsung Galaxy S21', 'Màn hình AMOLED, Snapdragon 888, 8GB RAM, 128GB ROM', 999.00, 25, 2),
('Tablet Apple iPad Pro 12.9', 'Màn hình Liquid Retina XDR, Chip M1, 128GB', 1099.00, 15, 3),
('Chuột Logitech MX Master 3', 'Chuột không dây cao cấp, kết nối Bluetooth/USB', 99.00, 50, 4),
('Bàn phím cơ Keychron K2', 'Bàn phím cơ 75%, đèn nền RGB, kết nối Bluetooth/USB-C', 129.00, 30, 4),
('Màn hình LG 27 inch 4K', 'Màn hình IPS, độ phân giải 3840x2160', 399.00, 20, 5),
('Tai nghe Sony WH-1000XM4', 'Tai nghe chống ồn không dây hàng đầu', 349.00, 40, 6),
('Ổ cứng SSD Samsung 980 Pro 1TB', 'Ổ cứng NVMe PCIe Gen4 tốc độ cao', 199.00, 35, 7),
('Webcam Logitech C920s', 'Webcam Full HD 1080p, micro kép', 79.00, 60, 8),
('Máy in Canon Pixma G3010', 'Máy in phun màu đa năng, in/scan/copy', 199.00, 25, 9),
('Loa Bluetooth JBL Flip 5', 'Loa di động chống nước, âm thanh mạnh mẽ', 119.00, 45, 6),
('Router Wifi TP-Link Archer AX50', 'Router Wifi 6 băng tần kép, tốc độ AX3000', 129.00, 30, 10),
('Ghế gaming DXRacer Formula F08', 'Ghế gaming công thái học, khung kim loại', 399.00, 15, 11),
('CPU Intel Core i5-12600K', 'Bộ vi xử lý Intel thế hệ 12, 10 nhân 16 luồng', 299.00, 20, 12),
('RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz', 'Bộ nhớ RAM hiệu năng cao', 89.00, 40, 12),
('Card đồ họa NVIDIA GeForce RTX 3060 Ti', 'Card đồ họa tầm trung hiệu năng tốt', 499.00, 10, 12),
('Vỏ máy tính Corsair Carbide 275R Airflow', 'Vỏ máy tính mid-tower, luồng gió tốt', 79.00, 25, 12),
('Nguồn máy tính Corsair RM750x (2021) 750W 80+ Gold', 'Bộ nguồn máy tính chất lượng cao', 129.00, 30, 12),
('Màn hình gaming ASUS TUF Gaming VG27AQ', 'Màn hình 27 inch QHD 165Hz 1ms', 349.00, 18, 5),
('Máy chiếu Epson EH-TW7100', 'Máy chiếu 4K PRO-UHD, 3000 lumens', 1499.00, 5, 8);

CREATE TABLE chitiet_donhang (
    ma_chitiet_donhang INT PRIMARY KEY AUTO_INCREMENT,
    ma_donhang INT,
    ma_sanpham INT,
    so_luong INT NOT NULL,
    don_gia DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ma_donhang) REFERENCES donhang(ma_donhang),
    FOREIGN KEY (ma_sanpham) REFERENCES sanpham(ma_sanpham)
);

INSERT INTO chitiet_donhang (ma_donhang, ma_sanpham, so_luong) VALUES
(1, 1, 1, 1500.00), -- Đơn hàng 1: 1 Laptop Dell XPS 13
(1, 3, 1, 1099.00), -- Đơn hàng 1: 1 Tablet Apple iPad Pro 12.9
(2, 2, 2, 999.00), -- Đơn hàng 2: 2 Smartphone Samsung Galaxy S21
(3, 4, 1, 99.00),  -- Đơn hàng 3: 1 Chuột Logitech MX Master 3
(3, 5, 1, 129.00), -- Đơn hàng 3: 1 Bàn phím cơ Keychron K2
(4, 1, 1, 1450.00), -- Đơn hàng 4: 1 Laptop Dell XPS 13 (giá khác)
(4, 6, 1, 380.00), -- Đơn hàng 4: 1 Màn hình LG 27 inch 4K (giá khác)
(5, 7, 1, 349.00), -- Đơn hàng 5: 1 Tai nghe Sony WH-1000XM4
(6, 2, 1, 950.00), -- Đơn hàng 6: 1 Smartphone Samsung Galaxy S21 (giá khác)
(6, 8, 1, 199.00), -- Đơn hàng 6: 1 Ổ cứng SSD Samsung 980 Pro 1TB
(7, 3, 2, 1050.00), -- Đơn hàng 7: 2 Tablet Apple iPad Pro 12.9 (giá khác)
(8, 9, 1, 75.00),  -- Đơn hàng 8: 1 Webcam Logitech C920s (giá khác)
(8, 10, 1, 190.00), -- Đơn hàng 8: 1 Máy in Canon Pixma G3010 (giá khác)
(9, 5, 2, 120.00), -- Đơn hàng 9: 2 Bàn phím cơ Keychron K2 (giá khác)
(9, 11, 1, 115.00), -- Đơn hàng 9: 1 Loa Bluetooth JBL Flip 5 (giá khác)
(10, 12, 1, 125.00), -- Đơn hàng 10: 1 Router Wifi TP-Link Archer AX50 (giá khác)
(10, 13, 1, 380.00), -- Đơn hàng 10: 1 Ghế gaming DXRacer Formula F08 (giá khác)
(11, 14, 1, 290.00), -- Đơn hàng 11: 1 CPU Intel Core i5-12600K (giá khác)
(11, 15, 2, 85.00), -- Đơn hàng 11: 2 RAM Corsair Vengeance LPX
(12, 16, 1, 480.00), -- Đơn hàng 12: 1 Card đồ họa NVIDIA GeForce RTX 3060 Ti (giá khác)
(12, 17, 1, 75.00), -- Đơn hàng 12: 1 Vỏ máy tính Corsair Carbide 275R Airflow (giá khác)
(13, 1, 1, 1550.00), -- Đơn hàng 13: 1 Laptop Dell XPS 13 (giá khác)
(13, 7, 1, 360.00), -- Đơn hàng 13: 1 Tai nghe Sony WH-1000XM4 (giá khác)
(14, 3, 1, 1100.00), -- Đơn hàng 14: 1 Tablet Apple iPad Pro 12.9 (giá khác)
(14, 9, 1, 80.00),  -- Đơn hàng 14: 1 Webcam Logitech C920s (giá khác)
(15, 2, 1, 1000.00), -- Đơn hàng 15: 1 Smartphone Samsung Galaxy S21 (giá khác)
(15, 18, 1, 130.00), -- Đơn hàng 15: 1 Nguồn máy tính Corsair RM750x (giá khác)