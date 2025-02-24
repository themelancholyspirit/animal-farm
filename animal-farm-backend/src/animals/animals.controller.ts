import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { PigStatusService } from '../pig-status/pig-status.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService, private readonly pigStatusService: PigStatusService) {}

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  async findSingle(@Param('id') id: number) {
    return this.animalsService.findSingle(id)
  }

  @Post(':id/feed')
  async feedAnimal(@Param('id') id: string, @Body('isThanks') isThanks: boolean) {
      if (isThanks){
        return this.animalsService.incrementCount(+id, true);
      } else {
        return this.animalsService.incrementCount(+id, false);
      }
  }
}
