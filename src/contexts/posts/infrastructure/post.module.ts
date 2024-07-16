import { Module } from "@nestjs/common";
import { CreatePostController } from "./http-api/create-post/create-post.controller";
import { CreatePostUseCase } from "../app/create-post-use-case/create-post.use.case";
import { InMemoryPostRepository } from "./repositories/in-memory.post.repository";
import { PostRepository } from "../domain/post.repository";
import { FindPostByIdUseCase } from "../app/find-post-use-case/find-post-by-id.use.case";
import { FindPostByIdController } from "./http-api/find-post/find-post-by-id.controller";
import { DeletePostUseCase } from "../app/delete-post-use-case/delete-post.use.case";
import { LikePostUseCase } from "../app/like-post-use-case/like-post.use.case";
import { UnlikePostUseCase } from "../app/unlike-post-use-case/unlike-post.use.case";
import { LikePostController } from "./http-api/like-post/like-post.controller";
import { UnlikePostController } from "./http-api/unlike-post/unlike-post.controller";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { InMemoryUserRepository } from "src/contexts/users/infrastructure/repositories/in-memory.user.repository";
import { FindPostsUserIdController } from "./http-api/find-posts-user-id/find-posts-user-id.controller";
import { FindPostsUserIdUseCase } from "../app/find-posts-user-id-use-case/find-posts-user-id.use.case";

@Module({
  controllers: [CreatePostController, FindPostByIdController, LikePostController, UnlikePostController, FindPostsUserIdController],
  providers: [
    CreatePostUseCase,
    FindPostByIdUseCase,
    DeletePostUseCase,
    LikePostUseCase,
    UnlikePostUseCase,
    FindPostsUserIdUseCase,
    InMemoryPostRepository,
    InMemoryUserRepository,
    {
      provide: PostRepository,
      useExisting: InMemoryPostRepository,
      // Cuando creamos una instancia de PostRepository, lo que haremos es que la inyección de dependencias de PostRepository se hará con la clase inMemoryPostRepository
    },
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository,
    },
  ],
  exports: [CreatePostUseCase, FindPostByIdUseCase, LikePostUseCase, UnlikePostUseCase],
})
export class PostModule {}
