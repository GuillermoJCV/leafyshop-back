import { Reflector } from "@nestjs/core";
import { ROLE_TYPES } from "src/types/ROLE_TYPES";

export const RequiredRoles = Reflector.createDecorator<ROLE_TYPES[]>();