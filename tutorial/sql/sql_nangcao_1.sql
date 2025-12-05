-- Bài tập 1 (Mới): Truy vấn phức tạp với JOIN và WHERE

-- Dựa trên cơ sở dữ liệu quanly_banhang, hãy thực hiện các truy vấn sau:

use quanly_banhang;

-- Hiển thị tên khách hàng và mã đơn hàng của tất cả các đơn hàng mà họ đã đặt.
select k.ten_khachhang, d.ma_donhang
from khachhang k join donhang d on k.ma_khachhang = d.ma_khachhang;

-- Hiển thị tên khách hàng và ngày đặt hàng của những đơn hàng có tổng tiền lớn hơn 100.00.
select k.ten_khachhang, d.ngay_dat_hang
from khachhang k join donhang d on k.ma_khachhang = d.ma_khachhang
where d.tong_tien>100.00;

-- Hiển thị mã đơn hàng và tên khách hàng của những đơn hàng được đặt trong năm 2024.
select k.ten_khachhang, d.ngay_dat_hang
from khachhang k join donhang d on k.ma_khachhang = d.ma_khachhang
where year(d.ngay_dat_hang)=2024;

-- Hiển thị tên khách hàng và số điện thoại của những khách hàng có địa chỉ ở 'Hà Nội'.
select k.ten_khachhang, k.so_dien_thoai
from khachhang k
where k.dia_chi='Hà Nội';

-- Hiển thị tên khách hàng và tổng số tiền mà mỗi khách hàng đã chi tiêu (từ tất cả các đơn hàng của họ).
select k.ten_khachhang, sum(d.tong_tien) as tong_tien
from khachhang k join donhang d on k.ma_khachhang = d.ma_khachhang
group by k.ten_khachhang;

-- Hiển thị tên khách hàng của những khách hàng chưa có đơn hàng nào. (Gợi ý: Sử dụng LEFT JOIN và WHERE).
select k.ten_khachhang
from khachhang k left join donhang d on k.ma_khachhang = d.ma_khachhang
group by k.ten_khachhang
having count(d.ma_donhang)=0;

-- Hiển thị mã đơn hàng và tên khách hàng của những đơn hàng có trạng thái là 'Đã giao' và được đặt trước ngày '2024-06-01'.
select d.ma_donhang,k.ten_khachhang
from khachhang k left join donhang d on k.ma_khachhang = d.ma_khachhang
where d.trang_thai='Đã giao' and d.ngay_dat_hang<'2024-06-01';

-- Hiển thị mã đơn hàng và tên khách hàng của những đơn hàng có tổng tiền lớn hơn mức trung bình của tất cả các đơn hàng. 
-- (Gợi ý: Sử dụng subquery).
select d.ma_donhang,k.ten_khachhang
from khachhang k left join donhang d on k.ma_khachhang = d.ma_khachhang
where d.tong_tien > (select avg(tong_tien) from donhang );

-- Hiển thị tên của những khách hàng có cùng địa chỉ. (Gợi ý: Sử dụng self-join).
select distinct a.ten_khachhang as khachhang_1, b.ten_khachhang as khachhang_2
from khachhang a join khachhang b on a.dia_chi=b.dia_chi and a.ma_khachhang<b.ma_khachhang;

-- Hiển thị mã đơn hàng và tên khách hàng của những đơn hàng có tổng tiền gần với 50.00 nhất (lớn hơn hoặc nhỏ hơn 50.00). 
-- (Câu hỏi này có thể phức tạp hơn, bạn có thể đưa ra cách tiếp cận của mình).
select d.ma_donhang, k.ten_khachhang, d.tong_tien,d.tong_tien
from khachhang k join donhang d on k.ma_khachhang=d.ma_khachhang
order by abs(d.tong_tien-50.000)
limit 1;



