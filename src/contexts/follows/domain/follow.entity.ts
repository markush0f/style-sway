// import { UserEntity } from 'src/contexts/users/domain/user.entity';
// import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
// import { UUID } from 'crypto';

// @Entity('follows')
// export class FollowEntity{
//   @PrimaryGeneratedColumn('uuid')
//   id: UUID;

//   @ManyToOne(() => UserEntity, user => user.following)
//   follower: UserEntity;

//   @ManyToOne(() => UserEntity, user => user.followers)
//   followed: UserEntity;

//   @CreateDateColumn()
//   followDate: Date;
// }
