import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayload } from "../types/accessTokenPayload.type";
import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";

@Injectable()
export class JwtHelper {
    constructor(private jwtService: JwtService) { }

    async generateToken(payload: AccessTokenPayload): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }
}