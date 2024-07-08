import { Module } from '@nestjs/common';
import { PostModule } from './contexts/posts/infrastructure/post.module';


@Module({
  imports: [PostModule],

})
export class AppModule {}
