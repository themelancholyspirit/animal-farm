import { Injectable } from '@angular/core';
import { FoodOption } from '../models/food-option.model';

@Injectable({
  providedIn: 'root'
})
export class FeedingService {
  private feedHistory: Map<number, string[]> = new Map();

  readonly foodOptions: FoodOption[] = [
    { name: 'Fresh Hay', icon: 'grass', value: 'hay' },
    { name: 'Corn', icon: 'grain', value: 'corn' },
    { name: 'Rotten Vegetables', icon: 'compost', value: 'rotten_vegetables' },
    { name: 'Sugar Cubes', icon: 'square', value: 'sugar' },
    { name: 'Leftover Slop', icon: 'delete', value: 'slop' },
    { name: 'Fresh Apples', icon: 'eco', value: 'apples' },
    { name: 'Moldy Bread', icon: 'warning', value: 'moldy_bread' },
    { name: 'Premium Oats', icon: 'stars', value: 'premium_oats' }
  ];

  addFeedingRecord(animalId: number, foodName: string) {
    if (!this.feedHistory.has(animalId)) {
      this.feedHistory.set(animalId, []);
    }
    this.feedHistory.get(animalId)?.push(foodName);
  }

  getRecentFeedings(animalId: number): string[] {
    return this.feedHistory.get(animalId)?.slice(-3) || [];
  }
} 