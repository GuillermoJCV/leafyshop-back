import { z } from "zod";

// RESPONSE

const UserResponseSchema = z.object({
	id : z.number(),
	username : z.string(),
	isActive: z.boolean(),
	isCustomer : z.boolean(),
	hashCode : z.string()
})
type UserResponse = z.infer<typeof UserResponseSchema>;

// REQUEST

const UserRequestLogInSchema = z.object({
	username : z.string(),
	password : z.string()
})
type UserRequestLogIn = z.infer<typeof UserRequestLogInSchema>

const UserRequestSignUpSchema = z.object({
	username : z.string(),
	password : z.string(),
	email : z.string(),
	roleId : z.optional(z.number())
})
type UserRequestSignUp = z.infer<typeof UserRequestSignUpSchema>;

// <------------EXPORT------------>

export {
	UserResponseSchema,
	UserResponse,
	UserRequestLogInSchema,
	UserRequestLogIn,
	UserRequestSignUpSchema,
	UserRequestSignUp,
}