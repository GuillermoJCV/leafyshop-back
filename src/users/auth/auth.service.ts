import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { USER_ROLES } from 'src/constants/USER_ROLES';
import { Payload } from 'src/types/payload';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestLogIn, UserRequestSignUp, UserResponse } from 'src/types/user_types';
import { CryptoService } from './crypto/crypto.service';
import { ROLE_TYPES } from 'src/types/ROLE_TYPES';

@Injectable()
export class AuthService {
	constructor(
		private prisma : PrismaService,
		private jwtService: JwtService,
		private crypto : CryptoService,
	) {}

	async validateUser(username : string, password : string) : Promise<User> {
		const user : User | null = await this.prisma.user.findUnique({ where : { username } })
		const decryptedPassword = user ? this.crypto.decrypt(user.password) : ""

		if(user && (decryptedPassword === password)) {
			return user
		} 
		else if (!user) throw new HttpException("El usuario no existe", HttpStatus.BAD_REQUEST)
		else throw new UnauthorizedException();
	}

	async validateNotExistingUser(username : string, email : string) : Promise<User> {
		const userByName = await this.prisma.user.findUnique({ where : { username } })
		const userByEmail = await this.prisma.user.findUnique({ where : { email } })
		const user : User = userByName ? userByName : userByEmail

		if(!userByName && !userByEmail) return user
		else {
			const errorMessage = userByName ? "Username already exists" : "Email already used"
			throw new HttpException(errorMessage, HttpStatus.CONFLICT)
		}
	}

	async login(userReq : UserRequestLogIn) : Promise<UserResponse> {
		const user : User = await this.validateUser(userReq.username, userReq.password)
		const payload : Payload = { sub : user.id, username : user.username, role : user.role_id }

		return ({
			id : user.id,
			username : user.username,
			isActive : user.status,
			isCustomer : user.role_id === USER_ROLES.CUSTOMER,
			hashCode : this.jwtService.sign(payload)
		})
	}

	async signup(userReq : UserRequestSignUp) : Promise<UserResponse> {

		if(userReq.roleId && userReq.roleId !== ROLE_TYPES.CUSTOMER) throw new HttpException("Los usuarios no cliente no están implementados todavía", HttpStatus.NOT_IMPLEMENTED)

		const createdUser = await this.prisma.user.create({
			data : {
				username 	: userReq.username,
				password 	: this.crypto.encrypt(userReq.password),
				status 		: true,
				email 		: userReq.email,
				role_id 	: ROLE_TYPES.CUSTOMER
			}
		})

		const payload : Payload = { sub : createdUser.id, username : createdUser.username, role : createdUser.role_id }
		return ({
			id : createdUser.id,
			username : createdUser.username,
			isActive : createdUser.status,
			isCustomer : createdUser.role_id === ROLE_TYPES.CUSTOMER,
			hashCode : this.jwtService.sign(payload)
		})
		
	}
}
