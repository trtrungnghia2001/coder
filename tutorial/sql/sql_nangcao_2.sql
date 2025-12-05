-- Bài tập 2: Truy vấn con (Subquery) dựa trên cơ sở dữ liệu quanly_banhang. Dưới đây là 10 yêu cầu dành cho bạn:

use quanly_banhang;
-- Hiển thị tên của những khách hàng đã đặt đơn hàng có tổng tiền lớn hơn mức trung bình của tất cả các đơn hàng.
select k.ten_khachhang
from khachhang k join donhang d on k.ma_khachhang=d.ma_khachhang
where d.tong_tien> (select avg(tong_tien) from donhang);

-- Hiển thị mã đơn hàng và tên của những khách hàng có cùng địa chỉ với khách hàng có mã là 1.
select d.ma_donhang, k.ten_khachhang
from khachhang k join donhang d on k.ma_khachhang=d.ma_khachhang
where k.dia_chi = (select dia_chi from khachhang where ma_khachhang=1);

-- Hiển thị tên của những khách hàng đã đặt đơn hàng vào ngày '2024-03-10'. (Gợi ý: Sử dụng subquery trong mệnh đề WHERE).
select k.ten_khachhang
from khachhang k join donhang d on k.ma_khachhang=d.ma_khachhang
where d.ngay_dat_hang in (select ngay_dat_hang from donhang where  ngay_dat_hang='2024-03-10');

-- Hiển thị tên của những khách hàng có số lượng đơn hàng lớn hơn số lượng đơn hàng trung bình của tất cả khách hàng.
select ten_khachhang
from khachhang join 
(select ma_khachhang, count(*) from donhang group by ma_khachhang having count(*) > 
	(select avg(soluong) from 
		(select count(*) as soluong from donhang group by ma_khachhang) as khachhang_donhang
	)
) as khachhang_donhang_lonhon_donhang_trungbinh
on khachhang.ma_khachhang= khachhang_donhang_lonhon_donhang_trungbinh.ma_khachhang;

-- Hiển thị mã đơn hàng và tổng tiền của các đơn hàng có tổng tiền lớn hơn tổng tiền của đơn hàng có mã là 5.
select ma_donhang,tong_tien
from donhang
where tong_tien> (select tong_tien from donhang where ma_donhang=5 );

-- Hiển thị tên của những khách hàng có đơn hàng với trạng thái là 'Đã giao'. (Gợi ý: Sử dụng EXISTS).
select distinct ten_khachhang,donhang.trang_thai
from khachhang join donhang 
on khachhang.ma_khachhang=donhang.ma_khachhang
where donhang.trang_thai ='Đã giao';

select kh.ten_khachhang
from khachhang kh
where exists
(select * from donhang where donhang.ma_khachhang = kh.ma_khachhang and trang_thai='Đã giao');

-- Hiển thị tên của những khách hàng không có đơn hàng nào. (Gợi ý: Sử dụng NOT EXISTS).
select kh.ten_khachhang
from khachhang kh
where not exists
(select count(*) from donhang where kh.ma_khachhang= donhang.ma_khachhang group by ma_khachhang);

-- Hiển thị mã đơn hàng và tên khách hàng của những đơn hàng có tổng tiền lớn hơn 
-- tổng tiền của bất kỳ đơn hàng nào được đặt bởi khách hàng có mã là 2. (Gợi ý: Sử dụng > ANY).
select kh.ten_khachhang
from khachhang kh join donhang dh
on kh.ma_khachhang= dh.ma_khachhang
where tong_tien > any (select tong_tien from donhang where ma_khachhang=2);

-- Hiển thị tên của những khách hàng đã đặt tất cả các đơn hàng có trạng thái là 'Đã giao'.
select kh.ten_khachhang
from khachhang kh 
where ma_khachhang in
(select ma_khachhang from donhang where trang_thai='Đã giao' group by ma_khachhang having count(*) = 
(select count(*) from donhang where trang_thai='Đã giao'));
 
-- (Câu hỏi này có thể phức tạp hơn, bạn có thể đưa ra cách tiếp cận của mình).
-- Hiển thị tên của những khách hàng có đơn hàng gần đây nhất (dựa trên ngay_dat_hang).
select kh.ten_khachhang,dh.ngay_dat_hang
from khachhang kh join donhang dh on kh.ma_khachhang = dh.ma_khachhang 
where dh.ngay_dat_hang = (select max(ngay_dat_hang) from donhang);