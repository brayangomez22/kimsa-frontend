import { Action, createReducer, on } from '@ngrx/store';
import actions from '../actions/clients.actions';

export interface ClientsState {
  clients: any[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const clientsInitialState: ClientsState = {
  clients: [],
  loaded: false,
  loading: false,
  error: null,
};

const _clientsReducer = createReducer(
  clientsInitialState,

  on(actions.LOAD_CLIENTS, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.LOAD_CLIENTS_SUCCESS, (state, { clients }) => ({
    ...state,
    loading: false,
    loaded: true,
    clients: [...clients],
  })),

  on(actions.LOAD_CLIENTS_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.ADD_CLIENT_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      clients: [...state.clients, payload],
    };
  }),

  on(actions.ADD_CLIENT_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.DELETE_CLIENT_SUCCESS, (state, { payload }) => {
    const alliedId = payload;
    return {
      ...state,
      clients: state.clients.filter((partner: any) => partner._id !== alliedId),
    };
  }),

  on(actions.DELETE_CLIENT_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function clientsReducer(
  state: ClientsState | undefined,
  action: Action
) {
  return _clientsReducer(state, action);
}