-- Bài tập 3: Hàm tổng hợp nâng cao và mệnh đề HAVING phức tạp hơn. 

use quanly_banhang;

-- Hiển thị tổng số khách hàng.
select count(*)
from khachhang;

-- Hiển thị mã khách hàng và số lượng đơn hàng mà mỗi khách hàng đã đặt, chỉ hiển thị những khách hàng đã đặt hơn 1 đơn hàng.
select ma_khachhang,count(*) as soluong
from donhang
group by ma_khachhang
having count(*)>1;

-- Hiển thị mã khách hàng và tổng số tiền đã chi tiêu của mỗi khách hàng, chỉ hiển thị những khách hàng đã chi tiêu tổng cộng hơn 200.00.
select ma_khachhang, sum(tong_tien)
from donhang
group by ma_khachhang
having sum(tong_tien)>200.00;

-- Hiển thị trạng thái đơn hàng và số lượng đơn hàng theo từng trạng thái, chỉ hiển thị những trạng thái có hơn 2 đơn hàng.
select trang_thai, count(*)
from donhang
group by trang_thai
having count(*)>2;

-- Hiển thị mã khách hàng và ngày đặt hàng đầu tiên của mỗi khách hàng.
select ma_khachhang,min(ngay_dat_hang)
from donhang
group by ma_khachhang;

-- Hiển thị mã khách hàng và ngày đặt hàng cuối cùng của mỗi khách hàng.
select ma_khachhang,max(ngay_dat_hang)
from donhang
group by ma_khachhang;

-- Tính tổng số tiền của tất cả các đơn hàng có trạng thái là 'Đã giao'.
select sum(tong_tien)
from donhang
where trang_thai='Đã giao'

-- Tìm mã khách hàng có số lượng đơn hàng lớn nhất. (Gợi ý: Sử dụng ORDER BY và LIMIT kết hợp với GROUP BY).
select ma_khachhang, count(*) as soluong
from donhang
group by ma_khachhang
order by soluong desc
limit 1;

-- Tìm trạng thái đơn hàng có tổng giá trị đơn hàng lớn nhất.
select trang_thai, sum(tong_tien) as tong_giatri
from donhang
group by trang_thai
order by tong_giatri desc
limit 1;

-- Hiển thị tên khách hàng và số lượng đơn hàng của những khách hàng có 
-- số lượng đơn hàng bằng với số lượng đơn hàng lớn nhất của bất kỳ khách hàng nào.
select kh.ma_khachhang,kh.ten_khachhang
from khachhang kh join 
(select ma_khachhang, count(*) as soluong from donhang dh1 group by ma_khachhang
	having count(*) in 
		(select count(*) from donhang dh2 where dh1.ma_khachhang != dh2.ma_khachhang group by ma_khachhang )
) as khachhang_soluongdon
on kh.ma_khachhang = khachhang_soluongdon.ma_khachhang;