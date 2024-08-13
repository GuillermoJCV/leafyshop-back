import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateCityDto } from "src/countries/cities/dto/create-city.dto";

export class ParseCitiesPipe implements PipeTransform {
	transform(value: CreateCityDto, _?: ArgumentMetadata) : Prisma.CityUncheckedCreateInput {
	    const { name, prefix, districtsDto, country_id } = value

	    const data : Prisma.DistrictCreateManyCityInput[] = !districtsDto ? undefined : 
	    districtsDto.map(({ name }) => ({ name }))

	    const districts : Prisma.DistrictCreateNestedManyWithoutCityInput = !data?.length ? undefined : {
	    	createMany : { data }
	    }

	    return ({
	    	name,
	    	prefix,
	    	districts,
	    	country_id
	    })
	}
}