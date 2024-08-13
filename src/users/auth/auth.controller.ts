import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { UserRequestLogIn, UserRequestSignUp, UserRequestSignUpSchema } from 'src/types/user_types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('users/auth')
export class AuthController {
	constructor(private authService : AuthService) {}

	@UsePipes(new ZodValidationPipe(UserRequestSignUpSchema))
	@Post()
	async signup(@Body() user : UserRequestSignUp) {
		this.authService.signup(user)
	}

	@Get(":username/:password")
	async login(@Param("username") username : string, @Param("password") password : string ) {
		const user : UserRequestLogIn = { username , password }
		return this.authService.login(user)
	}
}