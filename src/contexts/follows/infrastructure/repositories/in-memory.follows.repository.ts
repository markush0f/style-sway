import { randomUUID, UUID } from "crypto";
import { Follow, PrimitiveFollow } from "../../domain/follow.model";
import { FollowRepository } from "../../domain/follow.repository";
import { PrimitiveUser } from "src/contexts/users/domain/user.model";
import { InMemoryUserRepository } from "src/contexts/users/infrastructure/repositories/in-memory.user.repository";

export class InMemoryFollowsRepository extends FollowRepository {

    constructor(
        private readonly inMemoryUserRepository: InMemoryUserRepository,
    ) {
        super();
        this.initializeFollows()
    }
    private users: PrimitiveUser[] = this.inMemoryUserRepository.users;
    follows: PrimitiveFollow[] = [

    ];

    async initializeFollows(): Promise<void> {
        this.follows = [
            {
                id: randomUUID(),
                followerId: this.users[0].id,
                followedId: this.users[1].id,
                followDate: new Date()
            },
            {
                id: randomUUID(),
                followerId: this.users[1].id,
                followedId: this.users[0].id,
                followDate: new Date()
            }
        ]
    }

    async follow(followerId: UUID, followedId: UUID): Promise<PrimitiveFollow> {
        const follow = Follow.create(followerId, followedId);
        this.follows.push(follow.toValue());
        return follow.toValue();
    }

    async unfollow(followerId: UUID, followedId: UUID): Promise<void> {
        this.follows = this.follows.filter((follow) => follow.followerId !== followerId && follow.followedId !== followedId);
        console.log(this.follows);
    }

    async findAllByFollowerId(followerId: UUID): Promise<PrimitiveFollow[]> {
        return this.follows.filter((follow) => follow.followerId === followerId);

    }

    async findAllByFollowedId(followedId: UUID): Promise<PrimitiveFollow[]> {
        return this.follows.filter((follow) => follow.followedId === followedId);
    }

}