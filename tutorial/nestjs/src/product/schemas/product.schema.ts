// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>; // Định nghĩa loại Document cho Mongoose

@Schema({ timestamps: true }) // Thêm timestamps để Mongoose tự động thêm createdAt và updatedAt
export class Product {
  @Prop({ required: true }) // Đánh dấu đây là thuộc tính bắt buộc
  name: string;

  @Prop() // Thuộc tính không bắt buộc
  description: string;

  @Prop({ required: true, min: 0 }) // Bắt buộc và giá trị tối thiểu là 0
  price: number;

  @Prop({ required: true, min: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
