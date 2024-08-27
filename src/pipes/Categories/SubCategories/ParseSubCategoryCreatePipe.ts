import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateSubcategoryDto } from "src/categories/subcategories/dto/create-subcategory.dto";
import { ParseProductPipe } from "src/pipes/Products/ParseProductsPipe";

export class ParseSubCategoryCreatePipe implements PipeTransform {
	transform(value: CreateSubcategoryDto, _?: ArgumentMetadata) : Prisma.SubCategoryUncheckedCreateInput {
		const { name, category_id, products : unparsedProducts } = value
		const data = !unparsedProducts ? [] : unparsedProducts.map((product) => new ParseProductPipe().transform(product))

		const products = !data.length ? undefined : { createMany : { data } }

		return {
			name,
			category_id,
			products
		}
	}
}