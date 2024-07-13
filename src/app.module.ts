import { Module } from '@nestjs/common';
import { PostModule } from './contexts/posts/infrastructure/post.module';
import { UserModule } from './contexts/users/infrastructure/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './contexts/shared/guards/auth.guard';


@Module({
  imports: [
    PostModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],

})
export class AppModule { }
