import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/User.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'pfm',
    host: 'localhost',
    username: 'root',
    password: 'medo12457896532',
    entities: [User],
    synchronize: true
  }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
