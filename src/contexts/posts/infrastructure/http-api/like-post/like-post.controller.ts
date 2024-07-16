import { Controller, HttpCode, HttpStatus, Param, Patch } from "@nestjs/common";
import { UUID } from "crypto";
import { LikePostUseCase } from "src/contexts/posts/app/like-post-use-case/like-post.use.case";

@Controller("posts")
export class LikePostController {
  constructor(private readonly likePostUseCase: LikePostUseCase) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch("like/:id")
  async run(@Param("id") id: UUID): Promise<void> {
    return await this.likePostUseCase.execute(id);
  }
}
