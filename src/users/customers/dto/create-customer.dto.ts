import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateCustomerDto {

	@ApiProperty({
		description : "Id del usuario"
	})
	customerId : number

	@ApiProperty({
		description : "Nombre completo de la persona"
	})
	name : string;

	@ApiProperty({
		description : "Teléfono de la persona"
	})
	phone : string;

	@ApiProperty({
		description : "Un telefono alternativo"
	})
	altPhone? : string;

	@ApiProperty({
		description : "Nombre completo de la persona"
	})
	altEmail? : string;

	@ApiProperty({
		description : "Direccion para encontrar al cliente"
	})
	directionRef : string;

	@ApiProperty({
		description : "Direccion alternativa para encontrar al cliente"
	})
	altDirectionRef? : string;

	@ApiProperty({
		description : "Código tributario"
	})
	tributaryCode : string;

	@ApiProperty({
		description : "Tipo de código tributario"
	})
	tributaryCodeType : string;

	@ApiProperty({
		description : "Id del país donde vive la persona"
	})
	countryId : number;
}

export const CreateCustomerScheme = z.object({
	customerId : z.number(),
	customerName : z.string(),
	phone : z.string(),
	altPhone : z.optional(z.string()),
	altEmail : z.optional(z.string()),
	directionReference : z.string(),
	altDirectionReference : z.optional(z.string()),
	tributaryCode : z.string(),
	tributaryCodeType : z.string(),
	countryId : z.number()
})