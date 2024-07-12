import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { UUID } from "crypto";

export class UserUnauthorizedException extends UnauthorizedException {
    constructor() {
        super("User unauthorized");
    }
}
