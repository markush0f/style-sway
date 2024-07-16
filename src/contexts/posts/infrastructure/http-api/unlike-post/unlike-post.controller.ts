import { Controller, HttpCode, HttpStatus, Param, Patch } from "@nestjs/common";
import { UUID } from "crypto";
import { UnlikePostUseCase } from "src/contexts/posts/app/unlike-post-use-case/unlike-post.use.case";

@Controller("posts")
export class UnlikePostController {
  constructor(private readonly unlikePostUseCase: UnlikePostUseCase) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch("unlike/:id")
  async run(@Param("id") id: UUID): Promise<void> {
    await this.unlikePostUseCase.execute(id);
  }
}
