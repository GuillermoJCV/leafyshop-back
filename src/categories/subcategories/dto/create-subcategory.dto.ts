import { CreateProductDto, CreateProductSchema } from "src/products/dto/create-product.dto";
import { z } from "zod";

export class CreateSubcategoryDto {
    name: string;
    category_id: number;
    products?: CreateProductDto[];
}

export const CreateSubcategoryScheme = z.object({
    name : z.string(),
    category_id : z.number().positive(),
    products : z.array(CreateProductSchema).optional()
})
