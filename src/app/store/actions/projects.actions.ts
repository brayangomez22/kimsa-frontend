import { createAction, props } from '@ngrx/store';
import { Project } from '../../core/models/project.model';

export const LOAD_PROJECTS = createAction('[Projects] Load Projects');

export const LOAD_PROJECTS_SUCCESS = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const LOAD_PROJECTS_ERROR = createAction(
  '[Projects] Load projects Error',
  props<{ payload: any }>()
);

export const UPDATE_PROJECT = createAction(
  '[Projects] Update project',
  props<{ project: Project }>()
);

export const UPDATE_PROJECT_SUCCESS = createAction(
  '[Projects] Update project success',
  props<{ project: any }>()
);

export const UPDATE_PROJECT_ERROR = createAction(
  '[Projects] Update project error',
  props<{ payload: any }>()
);

export const ADD_PROJECT = createAction(
  '[Projects] Add project',
  props<{ payload: any }>()
);

export const ADD_PROJECT_SUCCESS = createAction(
  '[Projects] Add projects success',
  props<{ project: any }>()
);

export const ADD_PROJECT_ERROR = createAction(
  '[Projects] Add projects error',
  props<{ payload: any }>()
);

export const DELETE_PROJECT = createAction(
  '[Projects] Delete project',
  props<{ payload: any }>()
);

export const DELETE_PROJECT_SUCCESS = createAction(
  '[Projects] Delete project success',
  props<{ payload: any }>()
);

export const DELETE_PROJECT_ERROR = createAction(
  '[Projects] Delete project error',
  props<{ payload: any }>()
);
