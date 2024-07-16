import { NotFoundException } from "@nestjs/common";
import { UUID } from "crypto";

export class UserNotFoundException extends NotFoundException {
  constructor(public readonly id: UUID) {
    super(`User with id: ${id} not found`);
  }
}

export class UserNotFoundExceptionByEmail extends NotFoundException {
  constructor(public readonly email: string) {
    super(`User with email: ${email} not found`);
  }
}
