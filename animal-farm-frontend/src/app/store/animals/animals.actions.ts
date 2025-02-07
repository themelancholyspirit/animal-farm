import { createAction, props } from '@ngrx/store';
import { Animal } from '../../models/animal.model';

export const loadAnimals = createAction('[Animals] Load Animals');
export const loadAnimalsSuccess = createAction(
  '[Animals] Load Animals Success',
  props<{ animals: Animal[] }>()
);
export const loadAnimalsFailure = createAction(
  '[Animals] Load Animals Failure',
  props<{ error: any }>()
);

export const feedAnimal = createAction(
  '[Animals] Feed Animal',
  props<{ animalId: number; isPositive: boolean }>()
);

export const feedAnimalSuccess = createAction(
  '[Animals] Feed Animal Success',
  props<{ animal: Animal }>()
);

export const feedAnimalFailure = createAction(
  '[Animals] Feed Animal Failure',
  props<{ error: any }>()
); 