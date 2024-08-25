import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";
import { CreateSubcategoryDto, CreateSubcategoryScheme } from "../subcategories/dto/create-subcategory.dto";

export class CreateCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ type : [CreateSubcategoryDto] })
    subcategories: CreateSubcategoryDto[];
}

export const CreateCategoryScheme = z.object({
    name : z.string(),
    subcategories : z.array(CreateSubcategoryScheme).optional()
})