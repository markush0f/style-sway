import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, UsePipes, ValidationPipe } from "@nestjs/common";
import { PrimitivePost } from "src/contexts/posts/domain/post.entity";
import { FindPostByIdUseCase } from "src/contexts/posts/app/find-post-use-case/find-post-by-id.use.case";
import { UUID } from "crypto";

@Controller("posts")
export class FindPostByIdController {
  constructor(private readonly findPostByIdUseCase: FindPostByIdUseCase) {}

  @Get("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  async run(
    @Param("id", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: UUID,
  ): Promise<{ post: PrimitivePost }> {
    return await this.findPostByIdUseCase.execute(id);
  }
}
