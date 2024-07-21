import { UUID } from "crypto";
import { Follow } from "../../domain/follow.model";
import { FollowRepository } from "../../domain/follow.repository";
import { User } from "src/contexts/users/domain/user.model";

export class InMemoryFollowsRepository extends FollowRepository {
    follows: Follow[] = [];

    async follow(follower: User, followed: User): Promise<void> {
        const follow = Follow.create(follower, followed);
        this.follows.push(follow);
        return Promise.resolve();
    }

    async unfollow(follower: User, followed: User): Promise<void> {
        this.follows = this.follows.filter((follow) => follow.follower.id !== follower.id && follow.followed.id !== followed.id);
        console.log(this.follows);
    }

    async findAllByFollowerId(followerId: UUID): Promise<Follow[]> {
        return this.follows.filter((follow) => follow.follower.id === followerId);

    }

    async findAllByFollowedId(followedId: UUID): Promise<Follow[]> {
        return this.follows.filter((follow) => follow.followed.id === followedId);
    }

}