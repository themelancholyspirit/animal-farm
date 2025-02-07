import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PigStatusEntity, PigStatus } from '../entities/pig-status.entity';

@Injectable()
export class PigStatusService implements OnModuleInit {
  constructor(
    @InjectRepository(PigStatusEntity)
    private pigStatusRepository: Repository<PigStatusEntity>,
  ) {}

  async onModuleInit() {
    await this.initializePigStatus();
  }

  private async initializePigStatus() {
    const count = await this.pigStatusRepository.count();
    if (count === 0) {
      await this.pigStatusRepository.save({
        status: PigStatus.DEFAULT,
      });
    }
  }

  async getStatus() {
    const status = await this.pigStatusRepository.findOne({ where: { id: 1 } });
    if (!status) {
      throw new NotFoundException('Pig status not found');
    }
    return status;
  }

  async updateStatus(newStatus: PigStatus) {
    const status = await this.pigStatusRepository.findOne({ where: { id: 1 } });
    if (!status) {
      throw new NotFoundException('Pig status not found');
    }
    
    status.status = newStatus;
    return this.pigStatusRepository.save(status);
  }
} 