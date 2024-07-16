import { UUID } from "crypto";
import { Post, PrimitivePost } from "./post.entity";

export abstract class PostRepository {
  abstract create(post: Post): Promise<PrimitivePost>;
  abstract findOneById(id: UUID): Promise<PrimitivePost | null>;
  abstract delete(id: UUID): Promise<void>;
  abstract like(id: UUID): Promise<void>;
  abstract unlike(id: UUID): Promise<void>;
  abstract findAllByUserId(userId: UUID): Promise<PrimitivePost[] | null>;
  abstract findAll(): Promise<PrimitivePost[] | null>;
  // abstract update(post: Post): Promise<void>;
  // abstract findAll(): Promise<Post[]>;
}
