import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UpdateSubcategoryDto } from "src/categories/subcategories/dto/update-subcategory.dto";
import { ParseProductPipe } from "src/pipes/Products/ParseProductsPipe";

export class ParseSubcategoryUpdatePipe implements PipeTransform {
	transform(value: UpdateSubcategoryDto, _?: ArgumentMetadata) : Prisma.SubCategoryUncheckedUpdateInput {
	    const { name, category_id, products : unparsedProducts } = value

	    const data = !unparsedProducts ? [] : unparsedProducts.map(product => new ParseProductPipe().transform(product))

	    const products = !data.length ? undefined : { createMany : { data } }

	    return {
	    	name,
	    	category_id,
	    	products
	    }
	}
}