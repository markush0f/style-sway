import { UUID } from "crypto";
import { Follow, PrimitiveFollow } from "./follow.model";
import { User } from "src/contexts/users/domain/user.model";

export abstract class FollowRepository {
    abstract follow(followerId: UUID, followedId: UUID): Promise<PrimitiveFollow>;
    abstract unfollow(followerId: UUID, followedId: UUID): Promise<void>;
    abstract findAllByFollowerId(followerId: UUID): Promise<PrimitiveFollow[]>;
    abstract findAllByFollowedId(followedId: UUID): Promise<PrimitiveFollow[]>;
}