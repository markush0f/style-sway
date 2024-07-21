import { Controller, Param, Post, Req } from "@nestjs/common";
import { UUID } from "crypto";
import { FollowUserUserCase } from "src/contexts/follows/app/follow-user-use-case/follow-user.use.case";

@Controller()
export class FollowUserController {

    constructor(
        private readonly followUserUseCase: FollowUserUserCase
    ) { }

    @Post(':followedId')
    async run(@Param('followedId') followedId: UUID, @Req() req: any) {
        return await this.followUserUseCase.execute(req.payload.userId, followedId);
    }
}