 /*
============= DATABASE =============

CREATE DATABASE database_name;
SHOW DATABASES;
DROP DATABASE database_name;

============= TABLE =============

CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint,
    column3 datatype constraint,
   ....
);

CREATE TABLE new_table AS
SELECT column1, column2,...
FROM existing_table
WHERE ....;

DROP TABLE IF EXISTS table_name;
TRUNCATE TABLE table_name;

Để thêm cột vào bảng, hãy sử dụng cú pháp sau:
ALTER TABLE table_name
ADD column_name datatype;

Để xóa một cột trong bảng, hãy sử dụng cú pháp sau:
ALTER TABLE table_name
DROP COLUMN column_name;

Để đổi tên cột trong bảng, hãy sử dụng cú pháp sau:
ALTER TABLE table_name
RENAME COLUMN old_name to new_name;

Để thay đổi kiểu dữ liệu, kích thước hoặc ràng buộc của một cột trong bảng, hãy sử dụng cú pháp sau:
ALTER TABLE table_name
MODIFY column_name new_datatype constraint;

Để thêm ràng buộc vào một bảng hiện có, hãy sử dụng cú pháp sau:
ALTER TABLE table_name
ADD CONSTRAINT constraint_name constraint_definition;

Để đổi tên bảng, hãy sử dụng cú pháp sau:
ALTER TABLE table_name
RENAME TO new_table_name;

Constraint









