import { Action, createReducer, on } from '@ngrx/store';
import actions from '../actions/allieds.actions';

export interface AlliedsState {
  allieds: any[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState: AlliedsState = {
  allieds: [],
  loaded: false,
  loading: false,
  error: null,
};

const _alliedsReducer = createReducer(
  initialState,

  on(actions.LOAD_ALLIEDS, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.LOAD_ALLIEDS_SUCCESS, (state, { allieds }) => ({
    ...state,
    loading: false,
    loaded: true,
    allieds: [...allieds],
  })),

  on(actions.LOAD_ALLIEDS_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.ADD_ALLIED_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      allieds: [...state.allieds, payload],
    };
  }),

  on(actions.ADD_ALLIED_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.DELETE_ALLIED_SUCCESS, (state, { payload }) => {
    const alliedId = payload;
    return {
      ...state,
      allieds: state.allieds.filter((partner: any) => partner._id !== alliedId),
    };
  }),

  on(actions.DELETE_ALLIED_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function alliedsReducer(
  state: AlliedsState | undefined,
  action: Action
) {
  return _alliedsReducer(state, action);
}