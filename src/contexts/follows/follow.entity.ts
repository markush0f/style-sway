import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../users/domain/user.entity';


@Entity('follows')
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.following)
  follower: UserEntity;

  @ManyToOne(() => UserEntity, user => user.followers)
  followed: UserEntity;

  @CreateDateColumn()
  followDate: Date;
}
