import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePostUseCase } from "src/contexts/posts/app/create-post-use-case/create-post.use.case";
import { PostRepository } from "src/contexts/posts/domain/post.repository";
import { PrimitivePost } from "src/contexts/posts/domain/post.entity";
import { FindPostByIdUseCase } from "src/contexts/posts/app/find-post-use-case/find-post-by-id.use.case";
import { UUID } from "crypto";

@Controller('posts')
export class FindPostByIdController {
    constructor(private readonly findPostByIdUseCase: FindPostByIdUseCase) { }

    @Get(':id')
    async run(@Param('id') id: UUID): Promise<{ post: PrimitivePost }> {
        return await this.findPostByIdUseCase.execute(id);
    }

}