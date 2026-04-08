import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { QueryProductDto } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(data: Product) {
    const newData = new this.productModel(data);
    return newData.save();
  }
  async findAll(queryDto: QueryProductDto) {
    const page = parseInt(queryDto.page || '1', 10);
    const limit = parseInt(queryDto.limit || '10', 10);
    const skip = (page - 1) * limit;
    console.log(queryDto);

    const query = {
      ...(queryDto.name && { name: { $regex: queryDto.name, $options: 'i' } }),
      ...(queryDto.minPrice && {
        price: { $gte: parseFloat(queryDto.minPrice) },
      }),
      ...(queryDto.maxPrice && {
        price: { $lte: parseFloat(queryDto.maxPrice) },
      }),
    };

    const totalRow = await this.productModel.countDocuments(query).exec();
    const totalPage = Math.ceil(totalRow / limit);

    const results = await this.productModel
      .find(query)
      .sort()
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      results,
      paginate: {
        page,
        limit,
        totalRow,
        totalPage,
      },
    };
  }
  async findOne(id: string) {
    return await this.productModel.findById(id).exec();
  }
  async update(id: string, data: Product) {
    return await this.productModel.findByIdAndUpdate(id, data).exec();
  }
  async delete(id: string) {
    return await this.productModel.findById(id).exec();
  }
}
