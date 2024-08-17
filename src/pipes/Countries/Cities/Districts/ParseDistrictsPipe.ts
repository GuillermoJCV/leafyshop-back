import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateDistrictDto } from "src/countries/cities/districts/dto/create-district.dto";

export class ParseDistrictsPipe implements PipeTransform {
	transform(value: CreateDistrictDto, _?: ArgumentMetadata) : Prisma.DistrictUncheckedCreateInput {
	    const { name, city_id } = value

	    return ({
	    	name,
	    	city_id
	    })
	}
}