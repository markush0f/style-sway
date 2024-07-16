import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JWT_CONSTANT } from "../secret/jwt.constant";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());
    if (isPublic) {
      return true;
    }
    if (!token) {
      console.log("no token");
      throw new UnauthorizedException("No token provided");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONSTANT,
      });
      request["payload"] = payload;
      console.log("TOKEN: ", request["payload"]);
    } catch {
      console.log("invalid token");
      throw new UnauthorizedException("Invalid token");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
