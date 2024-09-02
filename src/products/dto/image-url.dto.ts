import { z } from "zod";
import { ApiProperty } from "@nestjs/swagger";

class ImageUrlDto {
    @ApiProperty()
    url: string;
}

const ImageUrlSchema = z.object({
    url : z.string().url("La imagen debe ser una url")
})

export {
	ImageUrlSchema,
	ImageUrlDto
}