import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { PostRepository } from "../../domain/post.repository";
import { UUID } from "crypto";

@Injectable()
export class FindPostByIdUseCase {

    constructor(private readonly postRepository: PostRepository) { }

    async execute(id: UUID): Promise<{ post: PrimitivePost }> {
        // const post = Post

        const post = await this.postRepository.findById(id);
        return {
            post: post.toValue()
        };
    }
}