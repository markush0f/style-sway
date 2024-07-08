import { Module } from "@nestjs/common";
import { CreatePostController } from "./http-api/create-post/create-post.controller";
import { CreatePostUseCase } from "../app/create-post-use-case/create-post.use.case";
import { InMemoryPostRepository } from "./repositories/in-memory.post.repository";

@Module({
    controllers: [CreatePostController],
    providers: [
        CreatePostUseCase,
        InMemoryPostRepository,
        {
            provide: "PostRepository",
            useExisting: InMemoryPostRepository
            // Cuando creamos una instancia de PostRepository, lo que haremos es que la inyecció de dependencias de PostRepository se hará con el inMemoryPostRepository
        }
    ],
    exports: [CreatePostUseCase]
})
export class PostModule {


}