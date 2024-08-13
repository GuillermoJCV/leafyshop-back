import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateCountryDto } from "src/countries/dto/create-country.dto";

export class ParseCountriesPipe implements PipeTransform {
	transform(value: CreateCountryDto, _?: ArgumentMetadata) : Prisma.CountryCreateInput {
	    const { name, currency, citiesDto } = value

	    const data : Prisma.CityCreateManyCountryInput[] = !citiesDto?.length ? undefined : 
	    citiesDto.map(({name, prefix}) => ({ name, prefix }))

	    const cities : Prisma.CityCreateNestedManyWithoutCountryInput = !data?.length ? undefined : {
	    	createMany : { data }
	    }

	    return ({
	    	name,
	    	currency,
	    	cities
	    })

	}
}