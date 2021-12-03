import { createAction, props } from '@ngrx/store';

export default {
  LOAD_ALLIEDS: createAction('[Allieds] Load allieds'),
  LOAD_ALLIEDS_SUCCESS: createAction('[Allieds] Load allieds success', props<{ allieds: any[] }>()),
  LOAD_ALLIEDS_FAILURE: createAction('[Allieds] Load allieds failure', props<{ payload: any }>()),
  ADD_ALLIED: createAction('[Allieds] Add allied', props<{ payload: any }>()),
  ADD_ALLIED_SUCCESS: createAction('[Allieds] Add allied success', props<{ payload: any }>()),
  ADD_ALLIED_FAILURE: createAction('[Allieds] Add allied failure', props<{ payload: any }>()),
  DELETE_ALLIED: createAction('[Allieds] Delete allied', props<{ payload: any }>()),
  DELETE_ALLIED_SUCCESS: createAction('[Allieds] Delete allied success', props<{ payload: any }>()),
  DELETE_ALLIED_FAILURE: createAction('[Allieds] Delete allied failure', props<{ payload: any }>()),
}