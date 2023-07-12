import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type ProductDocument = Product & Document;

@Schema({ _id: false, versionKey: false })
export class ProductVariant {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  sku: string;

  @Prop({
    required: false,
  })
  additionalCost?: number;

  @Prop({
    required: true,
  })
  stockCount: number;
}

const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);

@Schema({ collection: 'Product' })
export class Product {
  @Exclude()
  _id: mongoose.Types.ObjectId;

  @Transform(({ value }) => value.toString())
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: mongoose.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    required: true,
    type: [ProductVariantSchema],
  })
  variants: ProductVariant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
