import { Body } from "@nestjs/common";
import { CreatePostUseCase } from "src/contexts/posts/app/create-post-use-case/create-post.use.case";
import { PostRepository } from "src/contexts/posts/domain/post.repository";
import { CreatePostHttpDto } from "./create-post.http-dto";
import { PrimitivePost } from "src/contexts/posts/domain/post.entity";

export class CreatePostController {
    constructor(private readonly createPostUseCase: CreatePostUseCase) { }

    async run(@Body() createPostHttpDto: CreatePostHttpDto): Promise<{ post: PrimitivePost }> {
        return await this.createPostUseCase.execute({
            title: createPostHttpDto.title,
            content: createPostHttpDto.content,
            userId: createPostHttpDto.userId,

        })
    }

}