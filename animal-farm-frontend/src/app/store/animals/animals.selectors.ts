import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimalState } from './animals.reducer';
import { Animal } from '../../models/animal.model';

export const selectAnimalState = createFeatureSelector<AnimalState>('animals');

export const selectAllAnimals = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.animals
);

export const selectAnimalById = (id: number) => createSelector(
  selectAllAnimals,
  (animals: Animal[]) => animals.find(animal => animal.id === id)
);

export const selectAnimalsLoading = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.loading
);

export const selectAnimalsError = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.error
); 