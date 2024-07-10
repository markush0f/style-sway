import { Module } from "@nestjs/common";
import { CreatePostController } from "./http-api/create-post/create-post.controller";
import { CreatePostUseCase } from "../app/create-post-use-case/create-post.use.case";
import { InMemoryPostRepository } from "./repositories/in-memory.post.repository";
import { PostRepository } from "../domain/post.repository";
import { FindPostByIdUseCase } from "../app/find-post-by-id/find-post-by-id.use.case";
import { FindPostByIdController } from "./http-api/find-post-by-id/find-post-by-id.controller";

@Module({
    controllers: [CreatePostController, FindPostByIdController],
    providers: [
        CreatePostUseCase,
        FindPostByIdUseCase,
        InMemoryPostRepository,
        {
            provide: PostRepository,
            useExisting: InMemoryPostRepository
            // Cuando creamos una instancia de PostRepository, lo que haremos es que la inyección de dependencias de PostRepository se hará con la clase inMemoryPostRepository
        }
    ],
    exports: [CreatePostUseCase, FindPostByIdUseCase]
})
export class PostModule {


}