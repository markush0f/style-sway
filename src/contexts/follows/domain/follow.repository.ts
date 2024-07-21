import { UUID } from "crypto";
import { Follow } from "./follow.model";
import { User } from "src/contexts/users/domain/user.model";

export abstract class FollowRepository {
    abstract follow(follower: User, followed: User): Promise<void>;
    abstract unfollow(follower: User, followed: User): Promise<void>;
    abstract findAllByFollowerId(followerId: UUID): Promise<Follow[]>;
    abstract findAllByFollowedId(followedId: UUID): Promise<Follow[]>;
}