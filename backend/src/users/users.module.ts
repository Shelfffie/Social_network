import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
