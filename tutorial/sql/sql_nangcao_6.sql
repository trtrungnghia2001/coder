-- Bài tập 6: Tổng hợp Kiến thức SQL Nâng cao

-- Dựa trên cơ sở dữ liệu quanly_banhang, hãy thực hiện các yêu cầu sau:
use quanly_banhang;

-- Tạo một view tên là top_khachhang hiển thị tên khách hàng và tổng số tiền họ đã chi tiêu, sắp xếp theo tổng tiền chi tiêu giảm dần.
create view top_khachhang
as 
select kh.ten_khachhang, sum(dh.tong_tien) as tong_sotien
from khachhang kh join donhang dh on kh.ma_khachhang= dh.ma_khachhang
group by dh.ma_khachhang
order by tong_sotien desc;

select * from top_khachhang;

-- Viết một stored procedure tên là lay_don_hang_trong_khoang_ngay nhận hai tham số đầu vào là ngày bắt đầu và ngày kết thúc, 
-- và trả về tất cả các đơn hàng được đặt trong khoảng thời gian đó (bao gồm cả ngày bắt đầu và ngày kết thúc).

DELIMITER //
create procedure lay_don_hang_trong_khoang_ngay(in ngay_batdau date, ngay_ketthuc date) 
begin
	select * from donhang where ngay_dat_hang>ngay_batdau and ngay_dat_hang<ngay_ketthuc and ngay_batdau< ngay_ketthuc;
end //
DELIMITER ;

call lay_don_hang_trong_khoang_ngay("2024-03-25","2024-07-15");

-- Sử dụng câu lệnh EXPLAIN để phân tích một truy vấn phức tạp (ví dụ: lấy tên khách hàng và tất cả các đơn hàng của họ được đặt trong một khoảng thời gian cụ thể, sắp xếp theo ngày đặt hàng).
-- Thực hiện một transaction để giảm số lượng hàng tồn kho trong một bảng sanpham (giả sử có cột ma_sanpham và so_luong_ton) khi một đơn hàng mới được tạo trong bảng donhang và các mục hàng tương ứng được thêm vào bảng chitiet_donhang. (Chỉ mô tả các bước SQL).
-- Sử dụng window function để hiển thị tên khách hàng, mã đơn hàng, ngày đặt hàng và tính số ngày khác biệt giữa ngày đặt hàng của đơn hàng hiện tại với ngày đặt hàng của đơn hàng trước đó của cùng khách hàng (sắp xếp theo ngày đặt hàng).
-- Tạo một trigger để tự động ghi lại thông tin (ví dụ: thời gian, người dùng, hành động) vào một bảng nhat_ky_ban_hang mỗi khi có một đơn hàng mới được thêm vào bảng donhang. (Chỉ mô tả cấu trúc trigger và logic).
-- Viết một truy vấn để tìm tên của những khách hàng có số đơn hàng lớn hơn số đơn hàng trung bình của tất cả các khách hàng (sử dụng subquery hoặc window function).
-- Viết một truy vấn để hiển thị tên của sản phẩm bán chạy nhất (dựa trên tổng số lượng bán ra từ bảng chitiet_donhang, giả sử có cột ma_sanpham và so_luong). (Bạn có thể cần tạo bảng sanpham và chitiet_donhang nếu muốn thực hiện truy vấn này).
-- Viết một truy vấn để tìm tên của những khách hàng đã mua ít nhất một sản phẩm có giá lớn hơn 50.00 (giả sử có bảng sanpham với cột ma_sanpham và gia). (Tương tự, bạn có thể cần tạo bảng sanpham nếu muốn thực hiện truy vấn này).
-- Thử tối ưu hóa một truy vấn chậm bằng cách thêm index phù hợp (ví dụ: một truy vấn tìm kiếm đơn hàng theo ngày đặt hàng). Sử dụng EXPLAIN để chứng minh sự cải thiện.