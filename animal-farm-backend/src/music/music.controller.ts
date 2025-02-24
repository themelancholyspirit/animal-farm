import { Controller, Post, Get } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('toggle')
  toggleMusic() {
    return this.musicService.toggleMusic();
  }

  @Get('status')
  getMusicStatus() {
    return this.musicService.getMusicStatus();
  }
} 