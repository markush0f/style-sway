import { Injectable, Param } from "@nestjs/common";
import { PostRepository } from "../../domain/post.repository";
import { UUID } from "crypto";

@Injectable()
export class UnlikePostUseCase {
    constructor(private readonly postRepository: PostRepository) { }

    async execute(@Param() id: UUID): Promise<void> {
        await this.postRepository.unlike(id);
    }
}