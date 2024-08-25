import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto, CreateCategoryScheme } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export const UpdateCategoryScheme = CreateCategoryScheme.partial()