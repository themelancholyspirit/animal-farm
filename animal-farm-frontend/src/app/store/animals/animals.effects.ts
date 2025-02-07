import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AnimalsService } from '../../utils/Animals.service';
import * as AnimalActions from './animals.actions';

@Injectable({
  providedIn: 'root'
})
export class AnimalEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly animalsService: AnimalsService
  ) {}

  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.loadAnimals),
      mergeMap(() => 
        this.animalsService.getAnimals().pipe(
          map(animals => AnimalActions.loadAnimalsSuccess({ animals })),
          catchError(error => of(AnimalActions.loadAnimalsFailure({ error })))
        )
      )
    )
  );

  feedAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.feedAnimal),
      mergeMap(action => 
        this.animalsService.feedAnimal(action.animalId, action.isPositive).pipe(
          map(animal => AnimalActions.feedAnimalSuccess({ animal })),
          catchError(error => of(AnimalActions.feedAnimalFailure({ error })))
        )
      )
    )
  );
} 