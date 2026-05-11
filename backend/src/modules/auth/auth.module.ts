import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SecurityService } from './security.service';

@Module({
  imports: [
    JwtModule.registerAsync({}),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, SecurityService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, SecurityService, AuthGuard],
})
export class AuthModule {}
