import { Controller, Get, Param, Req } from "@nestjs/common";
import { FindPostsUserIdUseCase } from "src/contexts/posts/app/find-posts-user-id-use-case/find-posts-user-id.use.case";
import { PrimitivePost } from "src/contexts/posts/domain/post.entity";
@Controller("posts")
export class FindPostsUserIdController {
    constructor(private readonly findPostsUserIdUseCase: FindPostsUserIdUseCase) { }

    // Change the name route
    @Get("/user/all")
    async run(@Req() req: any): Promise<PrimitivePost[]> {
        return await this.findPostsUserIdUseCase.execute(req.payload.userId);
    }
}
