import { Injectable, Param } from "@nestjs/common";
import { PostRepository } from "../../domain/post.repository";
import { UUID } from "crypto";

@Injectable()
export class DeletePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    execute(@Param() id: UUID): void {
        this.postRepository.delete(id);
    }
}