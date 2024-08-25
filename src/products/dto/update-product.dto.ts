import { PartialType } from '@nestjs/swagger';
import { CreateProductDto, CreateProductSchema } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export const UpdateProductScheme = CreateProductSchema.partial()