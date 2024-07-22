import { Module } from "@nestjs/common";
import { UnFollowUserController } from "./http-api/unfollow-user/unfollow-user.controller";
import { FollowUserController } from "./http-api/follow-user/follow-user.controller";
import { FollowUserUserCase } from "../app/follow-user-use-case/follow-user.use.case";
import { UnfollowUserUserCase } from "../app/unfollow-user-user-case/unfollow-user.use.case";
import { FollowRepository } from "../domain/follow.repository";
import { InMemoryFollowsRepository } from "./repositories/in-memory.follows.repository";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { InMemoryUserRepository } from "src/contexts/users/infrastructure/repositories/in-memory.user.repository";

@Module({
    controllers: [
        UnFollowUserController,
        FollowUserController
    ],
    providers: [
        FollowUserUserCase,
        UnfollowUserUserCase,
        {
            provide: FollowRepository,
            useExisting: InMemoryFollowsRepository
        },
        {
            provide: UserRepository,
            useExisting: InMemoryUserRepository
        }
    ],
    exports: []
})
export class FollowModule { }