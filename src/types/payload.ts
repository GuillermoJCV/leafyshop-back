import { z } from "zod";

const PayloadScheme = z.object({
	sub : z.number(),
	username : z.string(),
	role : z.number()
})
.required()
.strict()

/* No uso infer porque me da propiedades opcionales*/
type Payload = {
	sub : number;
	username : string,
	role : number
}


export {
	PayloadScheme,
	Payload
}