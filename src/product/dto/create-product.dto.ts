import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class ProductVariants {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  sku: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  additionalCost: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  stockCount: number;
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ValidateNested({ each: true })
  @ApiProperty({
    type: ProductVariants,
    isArray: true,
  })
  @IsNotEmpty()
  @Type(() => ProductVariants)
  variants: ProductVariants[];
}
