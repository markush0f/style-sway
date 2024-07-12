import { UUID } from "crypto";
import { Post } from "./post.entity";

export abstract class PostRepository {
    abstract create(post: Post): Promise<Post>;
    abstract findOneById(id: UUID): Promise<Post | null>;
    abstract delete(id: UUID): Promise<void>;
    abstract like(id: UUID): Promise<void>;
    abstract unlike(id: UUID): Promise<void>;
    // abstract update(post: Post): Promise<void>;
    // abstract findAll(): Promise<Post[]>;
}