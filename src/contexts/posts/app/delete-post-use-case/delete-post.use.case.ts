import { Injectable, Param } from "@nestjs/common";
import { PostRepository } from "../../domain/post.repository";
import { UUID } from "crypto";

@Injectable()
export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: UUID): Promise<void> {
    try {
      await this.postRepository.delete(id);
    } catch (error) {}
  }
}
