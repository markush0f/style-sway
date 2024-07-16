import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PostRepository } from "../../domain/post.repository";
import { UUID } from "crypto";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { isUUID } from "class-validator";

@Injectable()
export class FindPostsUserIdUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(userId: UUID): Promise<PrimitivePost[] | []> {
    try {
      if (!isUUID(userId)) {
        throw new ConflictException("Invalid user ID format");
      }
      console.log(userId);
      const posts = (await this.postRepository.findAllByUserId(userId)) ?? [];
      if (!posts) {
        throw new ConflictException("Posts not found");
      }
      console.log(posts);
      return posts;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(`Failed to find posts for user ${userId}: ${error.message}`);
    }
  }
}
