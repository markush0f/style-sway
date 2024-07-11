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

@Module({
    controllers: [CreatePostController, FindPostByIdController, LikePostController, UnlikePostController],
    providers: [
        CreatePostUseCase,
        FindPostByIdUseCase,
        DeletePostUseCase,
        LikePostUseCase,
        UnlikePostUseCase,
        InMemoryPostRepository,
        {
            provide: PostRepository,
            useExisting: InMemoryPostRepository
            // Cuando creamos una instancia de PostRepository, lo que haremos es que la inyección de dependencias de PostRepository se hará con la clase inMemoryPostRepository
        }
    ],
    exports: [CreatePostUseCase, FindPostByIdUseCase, LikePostUseCase, UnlikePostUseCase]
})
export class PostModule {


}