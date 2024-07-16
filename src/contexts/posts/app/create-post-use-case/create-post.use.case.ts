import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { PostRepository } from "../../domain/post.repository";
import { CreatePostDto } from "./create-post.dto";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { User } from "src/contexts/users/domain/user.entity";
import { UserNotFoundException } from "src/contexts/users/domain/exceptions/user-not-found.exception";
import { UUID } from "crypto";

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    // private readonly jwtHelper: JwtHelper
  ) {}

  async execute(createPostDto: CreatePostDto, userId: UUID): Promise<{ post: PrimitivePost }> {
    try {
      const userFounded: User = await this.userRepository.findOneById(userId);
      if (!userFounded) {
        throw new UserNotFoundException(userId);
      }
      console.log(userId);
      const post = Post.create({ ...createPostDto, userId: userId });
      console.log(post);
      await this.postRepository.create(post);
      return {
        post: post.toValue(),
      };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new UserNotFoundException(error.id);
      }
      throw error;
    }
  }
}
