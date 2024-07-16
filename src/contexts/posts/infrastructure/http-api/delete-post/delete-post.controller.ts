import { Controller, Delete, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { UUID } from "crypto";
import { DeletePostUseCase } from "src/contexts/posts/app/delete-post-use-case/delete-post.use.case";

@Controller("posts")
export class DeletePostController {
  constructor(private readonly deletePostUseCase: DeletePostUseCase) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  run(@Param("id") id: UUID): void {
    this.deletePostUseCase.execute(id);
  }
}
