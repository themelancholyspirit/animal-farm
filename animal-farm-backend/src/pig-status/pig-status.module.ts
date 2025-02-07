import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PigStatusEntity } from '../entities/pig-status.entity';
import { PigStatusController } from './pig-status.controller';
import { PigStatusService } from './pig-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([PigStatusEntity])],
  controllers: [PigStatusController],
  providers: [PigStatusService],
  exports: [PigStatusService],
})
export class PigStatusModule {} 