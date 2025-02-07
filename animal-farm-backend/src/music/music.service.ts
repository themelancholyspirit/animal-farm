import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicService {
  private isMusicPlaying = false;

  toggleMusic() {
    this.isMusicPlaying = !this.isMusicPlaying;
    return { isPlaying: this.isMusicPlaying };
  }

  getMusicStatus() {
    return { isPlaying: this.isMusicPlaying };
  }
} 