import { createReducer, on } from '@ngrx/store';
import { Animal } from '../../models/animal.model';
import * as AnimalActions from './animals.actions';

export interface AnimalState {
  animals: Animal[];
  loading: boolean;
  error: any;
}

export const initialState: AnimalState = {
  animals: [],
  loading: false,
  error: null
};

export const animalReducer = createReducer(
  initialState,
  on(AnimalActions.loadAnimals, state => ({
    ...state,
    loading: true
  })),
  on(AnimalActions.loadAnimalsSuccess, (state, { animals }) => ({
    ...state,
    animals,
    loading: false
  })),
  on(AnimalActions.loadAnimalsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(AnimalActions.feedAnimalSuccess, (state, { animal }) => ({
    ...state,
    animals: state.animals.map(a => 
      a.id === animal.id ? animal : a
    )
  }))
); 