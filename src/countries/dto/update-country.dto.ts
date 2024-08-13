import { PartialType } from "@nestjs/swagger"
import { CreateCountryDto, CreateCountrySchema } from "./create-country.dto"

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

export const UpdateCountrySchema = CreateCountrySchema.partial()