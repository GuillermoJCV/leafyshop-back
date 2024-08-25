import { PartialType } from '@nestjs/swagger';
import { CreateSubcategoryDto } from './create-subcategory.dto';
import { CreateCategoryScheme } from 'src/categories/dto/create-category.dto';

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {}

export const UpdateSubcategoryScheme = CreateCategoryScheme.partial()