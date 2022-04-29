import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  projects: reducers.ProjectsState;
  partners: reducers.PartnersState;
  images: reducers.ImagesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  projects: reducers.projectsReducer,
  partners: reducers.partnersReducer,
  images: reducers.imagesReducer,
};
