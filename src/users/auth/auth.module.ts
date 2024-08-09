import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    JwtModule.register({
      secret : process.env.SECRET || "SECRET",
      signOptions : { expiresIn : "60s" }
    }),
    CryptoModule
  ],
  providers: [AuthService, JwtStrategy, CryptoService],
  controllers: [AuthController]
})
export class AuthModule {}
