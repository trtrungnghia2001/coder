import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { QueryProductDto } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: Product) {
    return this.productService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: Product) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Đặt mã trạng thái HTTP 204 No Content cho delete thành công
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() queryDto: QueryProductDto) {
    console.log({ queryDto });

    return this.productService.findAll(queryDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
}
