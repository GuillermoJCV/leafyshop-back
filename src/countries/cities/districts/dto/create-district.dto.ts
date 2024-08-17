import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateDistrictDto {
	@ApiProperty()
	name : string;

	@ApiProperty({
		default : 0,
		description	: `Si se está creando un distrito directamente, 
		es necesario especificar a qué ciudad pertenece, 
		pero si se está creando desde una ciudad o país. No es necesario`
	})
	city_id : number;
}

export const CreateDistrictScheme = z.object({
	name : z.string(),
	city_id : z.number()
})