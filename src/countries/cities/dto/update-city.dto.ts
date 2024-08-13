import { PartialType } from '@nestjs/swagger';
import { CreateCityDto, CreateCitySchema } from './create-city.dto';

export class UpdateCityDto extends PartialType(CreateCityDto) {}

export const UpdateCitySchema = CreateCitySchema.partial()