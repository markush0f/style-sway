import { Injectable } from "src/contexts/shared/dependency-injection/injectable";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { PostRepository } from "../../domain/post.repository";
import { CreatePostDto } from "./create-post.dto";

@Injectable()
export class CreatePostUseCase {

    constructor(private readonly postRepository: PostRepository) { }

    async execute(createPostDto: CreatePostDto): Promise<{ post: PrimitivePost }> {
        const post = Post.create(createPostDto);

        await this.postRepository.create(post);
        return {
            post: post.toValue()
        };
    }
}