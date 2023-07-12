import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoId } from 'src/common/types';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(productData: CreateProductDto) {
    const instance = await this.productModel.create(productData);

    return instance;
  }

  async findAll(searchFields: any) {
    const instances = await this.productModel.find(searchFields);
    return instances;
  }

  async findById(id: MongoId) {
    const instance = await this.productModel.findById(id);
    return instance;
  }

  async findOne(query: any) {
    const instance = await this.productModel.findOne(query);
    return instance;
  }

  async findByIdAndUpdate(
    id: MongoId,
    data: UpdateProductDto,
  ): Promise<Product> {
    const updatedInstance = await this.productModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      },
    );
    return updatedInstance;
  }

  async delete(id: MongoId) {
    return this.productModel.deleteOne({ _id: id });
  }
}
