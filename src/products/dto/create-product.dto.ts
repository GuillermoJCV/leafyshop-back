import { z } from "zod";
import { ApiProperty } from "@nestjs/swagger";
import { ImageUrlDto, ImageUrlSchema } from "./image-url.dto";

export class CreateProductDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    unitPrice: number;

    @ApiProperty()
    unitMeasure: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    shippingCost: number;

    @ApiProperty()
    score: number;

    @ApiProperty()
    iva: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    stock?: number;

    @ApiProperty()
    subcategoryId?: number;

    @ApiProperty()
    inventoryId: number;

    @ApiProperty({ type : [ImageUrlDto] })
    imageUrls?: ImageUrlDto[];
    
    //orders?: Prisma.OrderDetailsUncheckedCreateNestedManyWithoutProductInput;

}

export const CreateProductSchema = z.object({
    name : z.string(),
    unitPrice : z.number().positive(),
    unitMeasure : z.string(),
    description : z.string().optional(),
    shippingCost : z.number().positive(),
    score : z.number().int().positive(),
    iva : z.number().positive(),
    discount : z.number().positive().default(0),
    stock : z.number().positive().int().default(0),
    subcategoryId : z.number().int().positive(),
    inventoryId : z.number().int().positive(),
    imageUrls : z.array(ImageUrlSchema.partial()).optional()
})