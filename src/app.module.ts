import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

const isProducction = process.env.PRODUCCTION || false

@Global()
@Module({
  imports:
  [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath : isProducction ? ".env" : ".env.local",
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports : [PrismaService]
})
export class AppModule {}
