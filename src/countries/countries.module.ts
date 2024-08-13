import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CitiesController } from './cities/cities.controller';
import { CitiesModule } from './cities/cities.module';
import { CitiesService } from './cities/cities.service';

@Module({
  providers: [CountriesService, CitiesService],
  controllers: [CountriesController, CitiesController],
  imports: [CitiesModule]
})
export class CountriesModule {}
