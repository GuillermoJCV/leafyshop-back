import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "src/types/payload";

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey : process.env.SECRET
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