import { ArgumentMetadata, PipeTransform } from "@nestjs/common/interfaces";
import { Prisma } from "@prisma/client";
import { CreateCustomerDto } from "src/users/customers/dto/create-customer.dto";


export class ParseCustomerPipe implements PipeTransform {
	transform(value: CreateCustomerDto, _?: ArgumentMetadata) : Prisma.CustomerUncheckedCreateInput {
	    const { 
    	customerId : customer_id,
		name : name,
		phone : phone,
		directionRef : direcction,
		altEmail : alt_email,
		altPhone : alt_phone,
		altDirectionRef : alt_direction,
		tributaryCode : tb_code,
		tributaryCodeType : tb_code_type,
		countryId : country_id
    	} = value

		return {
			customer_id,
			name,
			phone,
			direcction,
			alt_email,
			alt_phone,
			alt_direction,
			tb_code,
			tb_code_type,
			country_id
		}
	}
}