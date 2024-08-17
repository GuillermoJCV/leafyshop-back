import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { RequiredRoles } from "src/decorators/RequiredRoles";
import { Payload } from "src/types/payload";
import { ROLE_TYPES } from "src/types/ROLE_TYPES";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") implements CanActivate {
	constructor(
		private reflector : Reflector,
		private jwtService : JwtService
	) {super()}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		console.log("Can Activate")
		const roles = this.reflector.get(RequiredRoles, context.getHandler())
		const headers = context.switchToHttp().getRequest().headers

		const payload : Payload | undefined = this.jwtService.decode(headers.authorization)
		if(!payload) return false

		if(payload.role === ROLE_TYPES.ADMIN) return true
		else if(roles.find((required_role) => required_role === payload.role)) return true
		else return false
	    
	}
}