import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { CreateEmployeeDto } from "src/users/employees/dto/create-employee.dto";

/* No necesario */
export class ParseEmployeesPipe implements PipeTransform {
	transform(value: CreateEmployeeDto, _?: ArgumentMetadata) {
	    
	}
}