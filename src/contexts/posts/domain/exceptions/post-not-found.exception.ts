import { NotFoundException } from "@nestjs/common";
import { UUID } from "crypto";

export class PostNotFoundException extends NotFoundException {
  constructor(public readonly id: UUID) {
    super(`Post wityh id: ${id} not found`);
  }
}
