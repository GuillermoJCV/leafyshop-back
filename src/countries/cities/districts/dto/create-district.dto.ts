import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateDistrictDto {
	@ApiProperty()
	name : string;
}

export const CreateDistrictScheme = z.object({
	name : z.string()
})