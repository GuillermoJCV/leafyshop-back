import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class CreateEmployeeDto implements Prisma.EmployeeUncheckedCreateInput {
	@ApiProperty({
		description : "Id del usuario que se registra como vendedor"
	})
	employee_id : number;

	@ApiProperty()
    name: string;

    @ApiProperty({
    	description : "La fecha en formato YYYY-MM-DD"
    })
    birth_date: string;

    @ApiProperty()
    country_id: number;

    @ApiProperty()
    inventory_id?: number;

    customers?: null;
}

export const CreateEmployeeScheme = z.object({
	employee_id : z.number(),
	name : z.string(),
	birth_date : z.string().date()
})