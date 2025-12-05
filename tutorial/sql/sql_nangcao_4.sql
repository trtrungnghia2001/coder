-- Bài tập 4: Thao tác trên chuỗi và ngày tháng

-- Dựa trên cơ sở dữ liệu quanly_banhang, hãy thực hiện các truy vấn sau:

use quanly_banhang;

-- Hiển thị tên khách hàng viết hoa toàn bộ.
select upper(ten_khachhang)
from khachhang;

-- Hiển thị tên khách hàng viết thường toàn bộ.
select lower(ten_khachhang)
from khachhang; 

-- Hiển thị ba ký tự đầu tiên của tên khách hàng.
select substr(ten_khachhang,1,3)
from khachhang; 

-- Hiển thị phần tên miền của email khách hàng (phần sau ký tự '@').
select substr(email,instr(email,'@')+1)
from khachhang; 

-- Hiển thị ngày đặt hàng theo định dạng 'ngày/tháng/năm' (ví dụ: 15/01/2024).
select date_format(ngay_dat_hang,"%d/%m/%y")
from donhang; 

-- Hiển thị năm của ngày đặt hàng.
select year(ngay_dat_hang)
from donhang;

-- Hiển thị tất cả các đơn hàng được đặt trong tháng 1.
select kh.ten_khachhang
from khachhang kh join donhang dh on kh.ma_khachhang=dh.ma_khachhang
where month(dh.ngay_dat_hang)=1;

-- Hiển thị tên khách hàng và số ngày kể từ ngày đặt hàng gần đây nhất của họ đến ngày hiện tại 
-- (giả sử ngày hiện tại là '2025-05-09').
select kh.ten_khachhang, datediff(now(), kh_dh_ngannhat.ngay_dat_hang)  as ngay_dat_hang_gannhat
from khachhang kh join 
(
select dh.ma_khachhang, max(dh.ngay_dat_hang) as ngay_dat_hang
from donhang dh 
group by ma_khachhang
) as kh_dh_ngannhat on kh.ma_khachhang = kh_dh_ngannhat.ma_khachhang;

-- Hiển thị tên khách hàng và thứ trong tuần của ngày đặt hàng đầu tiên của họ.
select kh.ten_khachhang, WEEKDAY(kh_dh_dautien.ngay_dat_hang) as thu
from khachhang kh join
(
select dh.ma_khachhang, min(dh.ngay_dat_hang) as ngay_dat_hang
from donhang dh 
group by ma_khachhang
) as kh_dh_dautien on kh.ma_khachhang = kh_dh_dautien.ma_khachhang;

-- Hiển thị tất cả các đơn hàng có ngày đặt hàng rơi vào cuối tuần (Thứ Bảy hoặc Chủ Nhật). 
-- (Câu hỏi này có thể phức tạp hơn, bạn có thể cần tìm hiểu về các hàm xử lý ngày trong MySQL).
select *
from donhang
where weekday(ngay_dat_hang)=5 or weekday(ngay_dat_hang)=6;
