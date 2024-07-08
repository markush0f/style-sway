import { UUID } from "crypto";

export class CreatePostDto {
    title: string;
    content: string;
    userId: UUID;
}