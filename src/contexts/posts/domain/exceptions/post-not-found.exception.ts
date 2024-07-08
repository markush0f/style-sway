import { UUID } from "crypto";

export class PostNotFoundException extends Error {
    constructor(public readonly id: UUID) {
        super(`Post not found: ${id}`);
    }
}