import { UUID, randomUUID } from 'crypto';
import { User } from '../../users/domain/user.model';

export interface PrimitiveFollow {
  id: UUID;
  followerId: UUID;
  followedId: UUID;
  followDate: Date;
}

export class Follow {
  constructor(private attributes: PrimitiveFollow) {}

  static create(followerId: UUID, followedId: UUID): Follow {
    return new Follow({
      id: randomUUID(),
      followerId,
      followedId,
      followDate: new Date(),
    });
  }

  toValue(): PrimitiveFollow {
    return { ...this.attributes };
  }

  get id(): UUID {
    return this.attributes.id;
  }

  get follower(): UUID {
    return this.attributes.followerId;
  }

  get followed(): UUID {
    return this.attributes.followedId;
  }

  get followDate(): Date {
    return this.attributes.followDate;
  }
}
