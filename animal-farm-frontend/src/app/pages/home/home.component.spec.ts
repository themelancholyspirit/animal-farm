import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        BrowserAnimationsModule
      ],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPigImage).toBe('assets/images/napoleon.jpg');
    expect(component.isRotating).toBeFalse();
    expect(component.isMusicPlaying).toBeFalse();
    expect(component.showMessage).toBeFalse();
    expect(component.isPutinMode).toBeFalse();
  });

  it('should have correct number of animals', () => {
    expect(component.animals.length).toBe(6);
  });

  describe('Animal Feeding', () => {
    it('should increment thanks count when feeding an animal', () => {
      const animal = component.animals[0];
      const initialCount = animal.thanksCount;
      
      component.feedAnimal(animal, component.foodOptions[0]);
      
      expect(animal.thanksCount).toBe(initialCount + 1);
    });

    it('should show message when feeding an animal', fakeAsync(() => {
      const animal = component.animals[0];
      
      component.feedAnimal(animal, component.foodOptions[0]);
      
      expect(component.showMessage).toBeTrue();
      expect(component.currentMessage).toContain(animal.name);
      
      tick(3000);
      
      expect(component.showMessage).toBeFalse();
    }));
  });

  describe('Pig Image Toggle', () => {
    it('should toggle between napoleon and putin images', fakeAsync(() => {
      const initialImage = component.currentPigImage;
      
      component.togglePigImage();
      tick(500);
      
      expect(component.currentPigImage).toContain('putin');
      expect(component.isPutinMode).toBeTrue();
      
      component.togglePigImage();
      tick(500);
      
      expect(component.currentPigImage).toBe(initialImage);
      expect(component.isPutinMode).toBeFalse();
    }));

    it('should show appropriate messages when toggling images', fakeAsync(() => {
      component.togglePigImage();
      tick(500);
      
      expect(component.showMessage).toBeTrue();
      expect(component.currentMessage).toContain('equal');
      
      tick(3000);
      expect(component.showMessage).toBeFalse();
    }));

    it('should stop music when toggling images', fakeAsync(() => {
      const event = new Event('click');
      component.toggleMusic(event);
      expect(component.isMusicPlaying).toBeTrue();
      
      component.togglePigImage();
      tick(500);
      
      expect(component.isMusicPlaying).toBeFalse();
    }));
  });

  describe('Music Controls', () => {
    it('should toggle music state', () => {
      const event = new Event('click');
      
      component.toggleMusic(event);
      expect(component.isMusicPlaying).toBeTrue();
      
      component.toggleMusic(event);
      expect(component.isMusicPlaying).toBeFalse();
    });

    it('should handle audio errors gracefully', () => {
      const event = new Event('click');
      spyOn(window.HTMLAudioElement.prototype, 'play').and.returnValue(Promise.reject('Audio error'));
      
      component.toggleMusic(event);
      
      expect(component.isMusicPlaying).toBeFalse();
    });
  });

  describe('Animal Quotes', () => {
    it('should return correct quote for animal', () => {
      const animal = component.animals[0];
      const quote = component.getAnimalQuote(animal);
      expect(quote).toBe(animal.quote || 'Four legs good, two legs bad!');
    });

    it('should return default quote when animal has no quote', () => {
      const animal = { ...component.animals[0], quote: undefined };
      const quote = component.getAnimalQuote(animal);
      expect(quote).toBe('Four legs good, two legs bad!');
    });
  });

  describe('Pig Alt Text', () => {
    it('should return correct alt text based on current image', () => {
      expect(component.getPigAltText()).toBe('Main Pig');
      
      component.currentPigImage = 'assets/images/putin.jpg';
      expect(component.getPigAltText()).toBe('Supreme Leader');
    });
  });

  describe('Component Initialization', () => {
    it('should preload images on init', () => {
      const spy = spyOnProperty(Image.prototype, 'src', 'set');
      
      component.ngOnInit();
      
      const expectedImageCount = component.animals.length + 3;
      expect(spy).toHaveBeenCalledTimes(expectedImageCount);
    });

    it('should initialize audio elements', () => {
      const audioSpy = spyOn(window, 'Audio');
      
      component.ngOnInit();
      
      expect(audioSpy).toHaveBeenCalledTimes(3);
    });
  });
}); 