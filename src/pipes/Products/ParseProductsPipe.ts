import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateProductDto } from "src/products/dto/create-product.dto";

export class ParseProductPipe implements PipeTransform {
	transform(value: CreateProductDto, _?: ArgumentMetadata) : Prisma.ProductUncheckedCreateInput {
	    const {
	    	name  			: name,
	    	unitPrice 		: unit_price,
	    	unitMeasure 	: unit_measure,
	    	description 	: description,
	    	shippingCost 	: shipping_cost,
	    	score 			: score,
	    	iva 			: iva,
	    	discount 		: discount,
	    	stock 			: stock,
	    	subcategoryId 	: subcategory_id,
	    	inventoryId 	: inventory_id,
	    	imageUrls  		: data
	    } = value

	    return {
	    	name,
	    	unit_price,
	    	unit_measure,
	    	description,
	    	shipping_cost,
	    	score,
	    	iva,
	    	discount,
	    	stock,
	    	subcategory_id,
	    	inventory_id,
	    	image_urls : {
	    		createMany : {
	    			data
	    		}
	    	}
	    }

	}
}