import { z } from "zod";
import { ApiProperty } from "@nestjs/swagger";
import { CreateCityDto, CreateCitySchema } from "../cities/dto/create-city.dto";

export class CreateCountryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    currency: string;

    @ApiProperty({ type : [CreateCityDto] })
    citiesDto?: CreateCityDto[];
}

export const CreateCountrySchema = z.object({
    name : z.string(),
    currency : z.string().max(5),
    citiesDto : z.optional(z.array(CreateCitySchema))
})