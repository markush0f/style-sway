import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "src/common/dependency-injection/injectable";
import { FollowRepository } from "../../domain/follow.repository";
import { UUID } from "crypto";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { UserNotFoundException } from "src/contexts/users/domain/exceptions/user-not-found.exception";

@Injectable()
export class FollowUserUserCase {
    constructor(
        private readonly followRepository: FollowRepository,
        private readonly userRepository: UserRepository
    ) { }

    async execute(followerId: UUID, followedId: UUID): Promise<void> {
        const userFollowerFounded = await this.userRepository.findOneById(followerId);
        const userFollowedFounded = await this.userRepository.findOneById(followedId)

        if (!userFollowerFounded) {
            throw new UserNotFoundException(followerId);
        }
        if (!userFollowedFounded) {
            throw new UserNotFoundException(followedId);
        }

        await this.followRepository.follow(userFollowerFounded, userFollowedFounded);
    }

}