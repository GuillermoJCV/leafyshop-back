import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { CountriesService } from './countries/countries.service';
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './categories/categories.module';

@Global()
@Module({
  imports:
  [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath : ".env",
      isGlobal: true,
    }),
    CountriesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CountriesService],
  exports : [PrismaService]
})
export class AppModule {}
