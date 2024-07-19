import { UUID, randomUUID } from 'crypto';
import { User } from '../users/domain/user.model';

export interface PrimitiveFollow {
  id: UUID;
  follower: User;
  followed: User;
  followDate: Date;
}

export class Follow {
  constructor(private attributes: PrimitiveFollow) {}

  static create(follower: User, followed: User): Follow {
    return new Follow({
      id: randomUUID(),
      follower,
      followed,
      followDate: new Date(),
    });
  }

  toValue(): PrimitiveFollow {
    return { ...this.attributes };
  }

  get id(): UUID {
    return this.attributes.id;
  }

  get follower(): User {
    return this.attributes.follower;
  }

  get followed(): User {
    return this.attributes.followed;
  }

  get followDate(): Date {
    return this.attributes.followDate;
  }
}
