/*
=============== I. LÝ THUYẾT ===============

SELECT a.column, b.column
FROM tableA a
JOIN tableB b ON a.id = b.a_id;

SELECT a.column, b.column
FROM tableA a
LEFT JOIN tableB b ON a.id = b.a_id;
/*

/* 
=============== II. Tạo bảng và thêm dữ liệu ===============
*/
CREATE TABLE favorites (
  user_id VARCHAR(36),
  product_id VARCHAR(36),
  PRIMARY KEY (user_id, product_id)
);

INSERT INTO favorites(user_id, product_id)
SELECT 
  (SELECT id FROM users ORDER BY RAND() LIMIT 1),
  (SELECT id FROM products ORDER BY RAND() LIMIT 1)
FROM products
LIMIT 20;

/* 
=============== III. BÀI TẬP ===============

1. Lấy tất cả products đã được favorite (INNER JOIN)
2. Lấy product name + user_id đã favorite
3. Lấy tất cả products + user_id (kể cả chưa favorite) (LEFT JOIN)
4. Lấy tất cả products chưa có ai favorite
5. Lấy user_id + product_id mà user đã favorite
6. Lấy user name + product name mà họ đã favorite
7. Lấy tất cả users + product (kể cả chưa favorite)
8. Đếm số lượng product mỗi user đã favorite
9. Lấy user có số lượng favorite > 1
10. Lấy product được favorite nhiều nhất
11. Lấy product + số lượng user đã favorite
12. Lấy product chưa có ai favorite (dùng GROUP BY)
13. Lấy user chưa favorite product nào
14. Lấy user + tổng số product (kể cả 0)
15. Lấy product + user_id, sắp xếp theo product_id
16. Lấy product + user_id, sắp xếp theo user_id giảm dần
17. Lấy 5 product đầu tiên có người favorite
18. Lấy 5 product có nhiều lượt favorite nhất
19. Xoá tất cả favorite của 1 user (theo user_id)
20. Xoá tất cả favorite của 1 product (theo product_id)
*/

select p.* 
from favorites f 
inner join products p on f.product_id = p.id;

select p.name, f.user_id
from favorites f 
inner join products p on f.product_id = p.id;

select p.*, f.user_id
from favorites f 
right join products p on f.product_id = p.id;

select p.*
from favorites f 
right join products p on f.product_id = p.id
where f.user_id is null;

select f.user_id, f.product_id
from favorites f 
inner join users u on f.user_id = u.id;

select u.name, p.name
from favorites f 
inner join users u on f.user_id = u.id
inner join products p on f.product_id = p.id;

-- 7
select u.*, table7.*
from users u 
left join (select p.*, f.user_id from favorites f inner join products p on f.product_id = p.id) as table7 on u.id = table7.user_id;

select u.*, count(f.product_id) as countProduct
from favorites f inner join users u on f.user_id = u.id
group by u.id;

select *
from user 
where id in (select id from)
-- count(f.product_id) as countProduct
-- from favorites f inner join users u on f.user_id = u.id
-- where count(f.product_id) > 1
-- group by u.id;

