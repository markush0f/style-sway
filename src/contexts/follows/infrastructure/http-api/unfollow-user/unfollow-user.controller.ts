import { Controller, Delete, Param, Post, Req } from "@nestjs/common";
import { UUID } from "crypto";
import { UnfollowUserUserCase } from "src/contexts/follows/app/unfollow-user-user-case/unfollow-user.use.case";

@Controller()
export class UnFollowUserController {

    constructor(
        private readonly unfollowUserUseCase: UnfollowUserUserCase
    ) { }

    @Delete(':unfollowedId')
    async run(@Param('unfollowedId') followedId: UUID, @Req() req: any) {
        return await this.unfollowUserUseCase.execute(req.payload.userId, followedId);
    }
}