import { PartialType } from '@nestjs/swagger';
import { CreateDistrictDto, CreateDistrictScheme } from './create-district.dto';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}

export const UpdateDistrictScheme = CreateDistrictScheme.partial()