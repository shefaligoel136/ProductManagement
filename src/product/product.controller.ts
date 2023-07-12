import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiFilterQuery, SearchProductQuery } from './dto/search-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiFilterQuery('search', SearchProductQuery)
  async findAll(
    @Query(
      'search',
      new ValidationPipe({
        transform: true,
        expectedType: SearchProductQuery,
      }),
    )
    search: SearchProductQuery,
  ) {
    const searchFields = search ? JSON.parse(search?.where) : {};
    return await this.productService.findAll(searchFields);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const ans = await this.productService.findById(id);
    return ans;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
