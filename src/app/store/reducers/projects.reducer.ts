import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Project } from '../../core/models/project.model';

export interface ProjectsState {
  projects: Project[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const projectsInitialState: ProjectsState = {
  projects: [],
  loaded: false,
  loading: false,
  error: null,
};

const _projectsReducer = createReducer(
  projectsInitialState,

  on(actions.LOAD_PROJECTS, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.LOAD_PROJECTS_SUCCESS, (state, { projects }) => ({
    ...state,
    loading: false,
    loaded: true,
    projects: [...projects],
  })),

  on(actions.LOAD_PROJECTS_ERROR, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.UPDATE_PROJECT_SUCCESS, (state, { project }) => {
    const projectsFiltered = state.projects.filter(
      (item: any) => item._id !== project._id
    );

    projectsFiltered.push(project);

    return {
      ...state,
      projects: projectsFiltered,
    };
  }),

  on(actions.ADD_PROJECT_SUCCESS, (state, { project }) => {
    return {
      ...state,
      projects: [...state.projects, project],
    };
  }),

  on(actions.ADD_PROJECT_ERROR, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.DELETE_PROJECT_SUCCESS, (state, { payload }) => {
    const userId = payload;
    return {
      ...state,
      projects: state.projects.filter((project: any) => project._id !== userId),
    };
  }),

  on(actions.DELETE_PROJECT_ERROR, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function projectsReducer(
  state: ProjectsState | undefined,
  action: Action
) {
  return _projectsReducer(state, action);
}
