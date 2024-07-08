import { UUID } from "crypto";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { PostRepository } from "../../domain/post.repository";

export class InMemoryPostRepository extends PostRepository {

    private posts: PrimitivePost[] = [];

    async create(post: Post): Promise<void> {
        try {
            this.posts.push(post.toValue());
        } catch (error) {
            throw error;
        }
    }

    async findById(id: UUID): Promise<Post | null> {
        const post = this.posts.find(post => post.id === id);
        return post ? new Post(post) : null;
    }

    remove(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    like(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    unlike(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}