import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
    @ApiProperty()
    name: string;

    /*@ApiProperty()
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;

    @ApiProperty()
    subCategories?: Prisma.SubCategoryCreateNestedManyWithoutCategoryInput;*/
}
