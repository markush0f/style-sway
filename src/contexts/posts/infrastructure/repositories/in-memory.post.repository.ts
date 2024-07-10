import { UUID } from "crypto";
import { Post, PrimitivePost } from "../../domain/post.entity";
import { PostRepository } from "../../domain/post.repository";

export class InMemoryPostRepository extends PostRepository {

    private posts: PrimitivePost[] = [];

    async create(post: Post): Promise<void> {
        this.posts.push(post.toValue());
    }

    async findById(id: UUID): Promise<Post | null> {
        const post = this.posts.find(post => post.id === id);
        return post ? new Post(post) : null;
    }

    remove(id: UUID): Promise<void> {
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
        }
        return Promise.resolve();
    }
    like(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    unlike(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}