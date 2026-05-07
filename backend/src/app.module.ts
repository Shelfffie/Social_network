import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { FriendsModule } from './modules/friends/friend-requests.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/social-media'),
    UsersModule,
    PostsModule,
    CommentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
