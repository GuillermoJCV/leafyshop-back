import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const JwtRegisteredModule = JwtModule.registerAsync({
  useFactory : (config : ConfigService) => ({
    secret : config.get<string>("SECRET"),
    signOptions : { expiresIn : "60s" }
  }),
  inject : [ConfigService]
})

@Module({
  imports: [
    CryptoModule,
    JwtRegisteredModule
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService],
  exports : [JwtRegisteredModule]
})
export class AuthModule {}
