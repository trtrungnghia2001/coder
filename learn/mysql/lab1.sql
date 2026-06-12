/*
=============== I. LÝ THUYẾT ===============

CREATE DATABASE database_name;

USE database_name;

CREATE TABLE table_name (
  column_name DATA_TYPE,
  column_name DATA_TYPE
);

INSERT INTO table_name(column1, column2)
VALUES (value1, value2);

SELECT column FROM table;

UPDATE table
SET column = value
WHERE condition;

DELETE FROM table
WHERE condition;
*/

/* 
=============== II. Tạo bảng và thêm dữ liệu ===============
*/

CREATE DATABASE learn_mysql;

USE learn_mysql;

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INT
);

CREATE TABLE products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100),
  price float,
  created_at datetime
);

INSERT INTO users(id, name, email, age) VALUES
(UUID(), 'Nghia', 'nghia@gmail.com', 22),
(UUID(), 'An', 'an@gmail.com', 25),
(UUID(), 'Binh', 'binh@gmail.com', 20),
(UUID(), 'Cuong', 'cuong@gmail.com', 30),
(UUID(), 'Dung', 'dung@gmail.com', 28);

INSERT INTO products(id, name, price, created_at) VALUES
(UUID(), 'Product 1', 100, NOW()),
(UUID(), 'Product 2', 120, NOW()),
(UUID(), 'Product 3', 150, NOW()),
(UUID(), 'Product 4', 200, NOW()),
(UUID(), 'Product 5', 250, NOW()),
(UUID(), 'Product 6', 300, NOW()),
(UUID(), 'Product 7', 180, NOW()),
(UUID(), 'Product 8', 220, NOW()),
(UUID(), 'Product 9', 270, NOW()),
(UUID(), 'Product 10', 320, NOW()),

(UUID(), 'Product 11', 110, NOW()),
(UUID(), 'Product 12', 130, NOW()),
(UUID(), 'Product 13', 160, NOW()),
(UUID(), 'Product 14', 210, NOW()),
(UUID(), 'Product 15', 260, NOW()),
(UUID(), 'Product 16', 310, NOW()),
(UUID(), 'Product 17', 190, NOW()),
(UUID(), 'Product 18', 230, NOW()),
(UUID(), 'Product 19', 280, NOW()),
(UUID(), 'Product 20', 330, NOW()),

(UUID(), 'Product 21', 115, NOW()),
(UUID(), 'Product 22', 135, NOW()),
(UUID(), 'Product 23', 165, NOW()),
(UUID(), 'Product 24', 215, NOW()),
(UUID(), 'Product 25', 265, NOW()),
(UUID(), 'Product 26', 315, NOW()),
(UUID(), 'Product 27', 195, NOW()),
(UUID(), 'Product 28', 235, NOW()),
(UUID(), 'Product 29', 285, NOW()),
(UUID(), 'Product 30', 335, NOW()),

(UUID(), 'Product 31', 140, NOW()),
(UUID(), 'Product 32', 170, NOW()),
(UUID(), 'Product 33', 200, NOW()),
(UUID(), 'Product 34', 240, NOW()),
(UUID(), 'Product 35', 290, NOW()),
(UUID(), 'Product 36', 340, NOW()),
(UUID(), 'Product 37', 210, NOW()),
(UUID(), 'Product 38', 260, NOW()),
(UUID(), 'Product 39', 310, NOW()),
(UUID(), 'Product 40', 360, NOW());

/* 
=============== III. BÀI TẬP ===============

1. Lấy tất cả products
2. Lấy name và price của tất cả products
3. Lấy products có price > 200
4. Lấy products có price < 150
5. Lấy products có price từ 150 đến 300
6. Lấy products có price > 200 và < 300
7. Lấy products có price < 200 hoặc > 300
8. Lấy products có tên chứa “1”
9. Lấy products có tên bắt đầu bằng “Product 1”
10. Lấy products có tên kết thúc bằng “0”
11. Lấy 5 products đầu tiên
12. Lấy 10 products tiếp theo (bỏ qua 5 cái đầu)
13. Lấy 10 products đắt nhất
14. Lấy 10 products rẻ nhất
15. Lấy products và sắp xếp theo price tăng dần
16. Cập nhật price của Product 1 thành 999
17. Tăng giá tất cả product < 200 thêm 50
18. Giảm giá tất cả product > 300 xuống 20
19. Xoá tất cả product có price < 120
20. Xoá product có tên = “Product 40”
*/

select * from products;

select name, price from products;

select * from products where price > 200;

select * from products where price < 150;

select * from products where price between 150 and 300;

select * from products where price < 300 and price > 200;

select * from products where price > 300 or price < 200;

select * from products where name Like '%1%';

select * from products where name Like 'Product 1%';

select * from products where name Like '%0';

select * from products limit 5;

select * from products limit 10 offset 5;

select * from products order by price desc limit 10;

select * from products order by price asc limit 10;

select * from products order by price asc;

-- 16
select * from products where name = 'Product 1';

update products
set price = 999
where name = 'Product 1';

select * from products where name = 'Product 1';

-- 17
create temporary table table17 as
select * from products where price < 200;

update products
set price = price + 50
where price < 200;

select * from products where id in (select id from table17);

-- 18
create temporary table table18 as
select * from products where price > 300;

update products
set price = price -20
where price > 300;

select * from products where id in (select id from table18);

-- 19
select * from products where price < 120;

delete from products
where price < 120;

select * from products where price < 120;

-- 20
select * from products where name = 'Product 40';

delete from products
where name = 'Product 40';

select * from products where name = 'Product 40';

