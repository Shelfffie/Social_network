import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { FriendsController } from './friends/friend-requests.controller';
import { FriendsModule } from './friends/friend-requests.module';

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
  controllers: [FriendsController],
  providers: [],
})
export class AppModule {}
