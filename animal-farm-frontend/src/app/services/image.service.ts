import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly IMAGES = {
    MAIN_PIG: 'assets/images/major.png',
    HAPPY_PIG: 'assets/images/happy-pig.png',
    ANGRY_PIG: 'assets/images/angry-pig.jpg',
    PUTIN: 'assets/images/putin.jpg',
    FALLBACK: 'assets/images/fallback.jpg'
  };

  preloadImages(additionalImages: string[] = []) {
    const imagesToPreload = [
      this.IMAGES.MAIN_PIG,
      this.IMAGES.HAPPY_PIG,
      this.IMAGES.PUTIN,
      ...additionalImages
    ];

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
      };
    });
  }
} 