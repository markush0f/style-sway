import { ConflictException } from "@nestjs/common";
import { UUID } from "crypto";

export class UserAlreadyExistsException extends ConflictException {
  constructor(public readonly id: UUID) {
    super(`User with id: ${id} already exists`);
  }
}
