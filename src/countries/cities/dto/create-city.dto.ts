import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { CreateDistrictDto } from "../districts/dto/create-district.dto";

export class CreateCityDto implements Prisma.CityUncheckedCreateInput {
	@ApiProperty()
    name: string;

    @ApiProperty()
    prefix: string;

    @ApiProperty({ type : [CreateDistrictDto]})
    districtsDto?: CreateDistrictDto[];

    @ApiProperty({ 
        description : `El número de país es opcional solamente si se está creando un país;
        por el contrario, si el usuario está creando una ciudad, 
        es necesario especificar a qué país pertenece`,
        default : 0 
    })
    country_id: number;
}

export const CreateCitySchema = z.object({
    name : z.string(),
    prefix : z.string(),
    country_id : z.number({ message : "Al crear una ciudad, es necesario especificar de qué país es"})
})