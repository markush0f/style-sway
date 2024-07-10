import { UUID } from "crypto";
import { Post } from "./post.entity";

export abstract class PostRepository {
    abstract create(post: Post): Promise<void>;
    abstract findById(id: UUID): Promise<Post | null>;
    abstract remove(id: UUID): Promise<void>;
    abstract like(): Promise<void>;
    abstract unlike(): Promise<void>;
    // abstract update(post: Post): Promise<void>;
    // abstract delete(post: Post): Promise<void>;
    // abstract findAll(): Promise<Post[]>;
}