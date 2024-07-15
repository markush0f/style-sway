import { Module } from '@nestjs/common';
import { PostModule } from './contexts/posts/infrastructure/post.module';
import { UserModule } from './contexts/users/infrastructure/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './contexts/shared/guards/auth.guard';
import { UserRepository } from './contexts/users/domain/user.repository';
import { InMemoryUserRepository } from './contexts/users/infrastructure/repositories/in-memory.user.repository';


@Module({
  imports: [
    PostModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    InMemoryUserRepository
  ],
  providers: [
    InMemoryUserRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],

})
export class AppModule {

  constructor(private readonly userRepository: InMemoryUserRepository) {
    this.initialize();
  } 
    async initialize(){
      await this.userRepository.initializeUsers();
      console.log(this.userRepository.users)
    }
  }



