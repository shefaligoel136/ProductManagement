import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { MongoId } from 'src/common/types';
import { FilterQuery } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepo.create(createProductDto);
  }

  async findAll(searchFields: any) {
    return await this.productRepo.findAll(searchFields);
  }

  async findById(id: MongoId) {
    return await this.productRepo.findById(id);
  }

  async update(id: MongoId, updateProductDto: UpdateProductDto) {
    return await this.productRepo.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: MongoId) {
    return await this.productRepo.delete(id);
  }
}
