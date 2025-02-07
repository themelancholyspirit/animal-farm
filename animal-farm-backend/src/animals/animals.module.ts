import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { Animal } from '../entities/animal.entity';
import { PigStatusModule } from '../pig-status/pig-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal]),
    PigStatusModule
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
