import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CountriesService } from './countries/countries.service';
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './users/auth/auth.module';

const RootConfigModule = ConfigModule.forRoot({
  envFilePath : ".env",
  isGlobal: true,
})

@Global()
@Module({
  imports:
  [
    RootConfigModule,
    AuthModule,
    CountriesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, CountriesService],
  exports : [
    PrismaService,
    RootConfigModule,
    AuthModule
  ]
})
export class AppModule {}
