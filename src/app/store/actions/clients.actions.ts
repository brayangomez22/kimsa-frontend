import { createAction, props } from '@ngrx/store';

export default {
  LOAD_CLIENTS: createAction('[Clients] Load Clients'),
  LOAD_CLIENTS_SUCCESS: createAction('[Clients] Load Clients success', props<{ clients: any[] }>()),
  LOAD_CLIENTS_FAILURE: createAction('[Clients] Load Clients failure', props<{ payload: any[] }>()),
  ADD_CLIENT: createAction('[Clients] Add client', props<{ payload: any }>()),
  ADD_CLIENT_SUCCESS: createAction('[Clients] Add client success', props<{ payload: any }>()),
  ADD_CLIENT_FAILURE: createAction('[Clients] Add client failure', props<{ payload: any }>()),
  DELETE_CLIENT: createAction('[Clients] Delete client', props<{ payload: any }>()),
  DELETE_CLIENT_SUCCESS: createAction('[Clients] Delete client success', props<{ payload: any }>()),
  DELETE_CLIENT_FAILURE: createAction('[Clients] Delete client failure', props<{ payload: any }>()),
}