import { Injectable } from "src/common/dependency-injection/injectable";
import { FollowRepository } from "../../domain/follow.repository";
import { UserRepository } from "src/contexts/users/domain/user.repository";
import { UUID } from "crypto";
import { UserNotFoundException } from "src/contexts/users/domain/exceptions/user-not-found.exception";

@Injectable()
export class FindFollowedsUseCase {
    constructor
        (
            private readonly followRepository: FollowRepository,
            private readonly userRepository: UserRepository,
        ) { }

    async execute(userId: UUID) {
        try {
            const userFounded = this.userRepository.findOneById(userId);
            if (!userFounded) {
                throw new UserNotFoundException(userId)
            }

            const followeds = this.followRepository.findAllByFollowedId(userId);
            return {
                followeds
            }

        } catch (error) {
            if (error instanceof UserNotFoundException) {
                throw new UserNotFoundException(error.id);
            }
        }

    }
}