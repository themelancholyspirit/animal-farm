import { Controller, Get, Post, Body } from '@nestjs/common';
import { PigStatusService } from './pig-status.service';
import { PigStatus } from '../entities/pig-status.entity';

@Controller('api/bidzina')
export class PigStatusController {
  constructor(private readonly pigStatusService: PigStatusService) {}

  @Get('status')
  getStatus() {
    return this.pigStatusService.getStatus();
  }

  @Post('status')
  updateStatus(@Body('status') status: PigStatus) {
    return this.pigStatusService.updateStatus(status);
  }
} 