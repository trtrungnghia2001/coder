// src/products/dto/query-product.dto.ts
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class QueryProductDto {
  @IsOptional() // Tham số này là tùy chọn
  @IsNumberString() // Đảm bảo nó là một chuỗi số (ví dụ: "1", "2")
  page?: string; // Trang hiện tại (mặc định 1)

  @IsOptional()
  @IsNumberString()
  limit?: string; // Số lượng mục trên mỗi trang (mặc định 10)

  @IsOptional()
  @IsString()
  // Ví dụ: 'name:asc', 'price:desc', 'createdAt:asc'
  // Bạn có thể dùng @IsIn(['name:asc', 'name:desc', 'price:asc', 'price:desc']) để giới hạn
  sort?: string;

  @IsOptional()
  @IsString()
  name?: string; // Lọc theo tên sản phẩm (tìm kiếm theo một phần tên)

  @IsOptional()
  @IsNumberString()
  minPrice?: string; // Lọc theo giá tối thiểu

  @IsOptional()
  @IsNumberString()
  maxPrice?: string; // Lọc theo giá tối đa
}
