import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private readonly AUDIO = {
    GEORGIA: 'assets/audio/georgia.mp3',
    PIG_THANKS: 'assets/audio/pig-thanks.mp3',
    SOVIET: 'assets/audio/soviet-anthem.mp3'
  };

  private audio!: HTMLAudioElement;
  private pigAudio!: HTMLAudioElement;
  private putinAudio!: HTMLAudioElement;

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    try {
      this.audio = new Audio(this.AUDIO.GEORGIA);
      this.pigAudio = new Audio(this.AUDIO.PIG_THANKS);
      this.putinAudio = new Audio(this.AUDIO.SOVIET);

      [this.audio, this.pigAudio, this.putinAudio].forEach(audio => {
        audio.onerror = (e) => {
          console.error('Error loading audio:', e);
        };
      });
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  playPigThanks() {
    this.pigAudio.play().catch(error => {
      console.error('Error playing pig audio:', error);
    });
  }

  playMusic(isPutinMode: boolean) {
    const audioToPlay = isPutinMode ? this.putinAudio : this.audio;
    return audioToPlay.play();
  }

  stopAllAudio() {
    this.audio.pause();
    this.putinAudio.pause();
    this.audio.currentTime = 0;
    this.putinAudio.currentTime = 0;
  }
} 