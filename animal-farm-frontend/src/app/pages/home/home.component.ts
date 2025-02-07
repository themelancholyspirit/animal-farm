import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { trigger, transition, style, animate } from '@angular/animations';
import { Animal } from '../../models/animal.model';
import { MatMenuModule } from '@angular/material/menu';
import { AnimalsService } from '../../utils/Animals.service';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as AnimalActions from '../../store/animals/animals.actions';
import * as AnimalSelectors from '../../store/animals/animals.selectors';
import { Observable } from 'rxjs';
import { AudioService } from '../../services/audio.service';
import { ImageService } from '../../services/image.service';
import { FeedingService } from '../../services/feeding.service';
import { FoodOption } from '../../models/food-option.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule
  ],
  providers: [AnimalsService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('subtitleAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.8s 0.3s ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('messageAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition('* => void', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.5s {{delay}}ms ease-out', 
          style({ opacity: 1, transform: 'scale(1)' })),
      ], { params: { delay: 0 } })
    ])
  ]
})

export class HomeComponent implements OnInit {
  animals: Animal[] = [];
  animals$: Observable<Animal[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  currentPigImage: string;
  isRotating = false;
  isMusicPlaying = false;
  showMessage = false;
  currentMessage = '';
  isPutinMode = false;

  animalMessages = new Map<number, string>();
  animalShowMessage = new Map<number, boolean>();

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

  constructor(
    private store: Store,
    private audioService: AudioService,
    private imageService: ImageService,
    private feedingService: FeedingService
  ) {
    this.currentPigImage = this.imageService.IMAGES.MAIN_PIG;
    this.animals$ = this.store.select(AnimalSelectors.selectAllAnimals);
    this.loading$ = this.store.select(AnimalSelectors.selectAnimalsLoading);
    this.error$ = this.store.select(AnimalSelectors.selectAnimalsError);
  }

  ngOnInit() {
    this.store.dispatch(AnimalActions.loadAnimals());
    this.imageService.preloadImages();
  }

  getAnimalQuote(animal: Animal): string {
    return animal.quote || 'Four legs good, two legs bad!';
  }

  getPigAltText(): string {
    return this.currentPigImage.includes('putin') ? 'Supreme Leader' : 'Main Pig';
  }

  async feedAnimal(animal: Animal, food: FoodOption) {
    this.feedingService.addFeedingRecord(animal.id, food.name);
    let isPositive = false;

    try {    
      
      // Here I had the logic for huggingface's LLM to analyze the response an animal would give to the main pig based on the type of food they were given, but most of the time it was hallucinating (tried so many different prompts, still) plus the client lib really sucked, resulting in me abandoning it.

      if (animal.favoriteFoods.includes(food.value)) {
        isPositive = true;
      }

      this.animalMessages.set(animal.id, `${animal.name} ${isPositive ? 'enjoyed' : 'didn\'t like'} the ${food.name.toLowerCase()}!`);
      this.animalShowMessage.set(animal.id, true);
      
      this.store.dispatch(AnimalActions.feedAnimal({ 
        animalId: animal.id, 
        isPositive: isPositive
      }));

      if (isPositive) {
        this.showPigGratitude();
        this.audioService.playPigThanks();
      } else {
        this.showPigAnger();
      }
      
    } catch (error) {
      this.animalMessages.set(animal.id, `${animal.name} enjoyed the ${food.name.toLowerCase()}!`);
      this.animalShowMessage.set(animal.id, true);
    }
    
    setTimeout(() => {
      this.animalShowMessage.set(animal.id, false);
    }, 3000);
  }

  showPigGratitude() {
    if (!this.isPutinMode) {
      const originalImage = this.currentPigImage;
      this.currentPigImage = this.imageService.IMAGES.HAPPY_PIG;
      setTimeout(() => {
        this.currentPigImage = originalImage;
      }, 2000);
    }
  }
  
  showPigAnger() {
    if (!this.isPutinMode) {
      const originalImage = this.currentPigImage;
      this.currentPigImage = this.imageService.IMAGES.ANGRY_PIG;
      setTimeout(() => {
        this.currentPigImage = originalImage;
      }, 2000);
    }
  }

  togglePigImage() {    
    this.isRotating = true;
    
    this.audioService.stopAllAudio();
    this.isMusicPlaying = false;

    setTimeout(() => {
      this.isPutinMode = !this.isPutinMode;
      this.currentPigImage = this.isPutinMode 
        ? this.imageService.IMAGES.PUTIN 
        : this.imageService.IMAGES.MAIN_PIG;
      
      this.isRotating = false;
      
      this.showMessage = true;
      this.currentMessage = this.isPutinMode
        ? 'All animals are equal, but some are more equal than others!'
        : 'Long live Animal Farm!';
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }, 500);
  }

  toggleMusic(event: Event) {
    event.stopPropagation();
    this.isMusicPlaying = !this.isMusicPlaying;
    
    try {
      this.audioService.stopAllAudio();
      
      if (this.isMusicPlaying) {
        this.audioService.playMusic(this.isPutinMode).catch(error => {
          console.error('Error playing audio:', error);
          this.isMusicPlaying = false;
        });
      }
    } catch (error) {
      console.error('Error toggling music:', error);
      this.isMusicPlaying = false;
    }
  }

  getRecentFeedings(animalId: number): string[] {
    return this.feedingService.getRecentFeedings(animalId);
  }
} 