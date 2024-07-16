import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { PostRepository } from "../../domain/post.repository";
import { UUID } from "crypto";
import { PostNotFoundException } from "../../domain/exceptions/post-not-found.exception";

@Injectable()
export class FindPostByIdUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: UUID): Promise<{ post: PrimitivePost }> {
    // const post = Post

    const post = await this.postRepository.findOneById(id);
    if (!post) {
      throw new PostNotFoundException(id);
    }
    console.log(post);
    return {
      post: post.toValue(),
    };
  }
}
