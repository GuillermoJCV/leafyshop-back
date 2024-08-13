import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { DistrictsModule } from './districts/districts.module';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
  imports: [DistrictsModule],
})
export class CitiesModule {}
