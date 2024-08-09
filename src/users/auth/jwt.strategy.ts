import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET_TEST } from "src/constants/SECRETS";
import { Payload } from "src/types/payload";

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey : process.env.SECRET || JWT_SECRET_TEST
		})
	}

	async validate(payload : Payload) {
		return { 
			userId : payload.sub,
			username : payload.username,
			roleId : payload.role
		}
	}
}