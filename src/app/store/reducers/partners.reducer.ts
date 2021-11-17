import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Partner } from 'src/app/core/models/partner.model';

export interface PartnersState {
  partners: Partner[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const partnersInitialState: PartnersState = {
  partners: [],
  loaded: false,
  loading: false,
  error: null,
};

const _partnersReducer = createReducer(
  partnersInitialState,

  on(actions.LOAD_PARTNERS, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.LOAD_PARTNERS_SUCCESS, (state, { partners }) => ({
    ...state,
    loading: false,
    loaded: true,
    partners: [...partners],
  })),

  on(actions.LOAD_PARTNERS_ERROR, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.UPDATE_PARTNER_SUCCESS, (state, { partner }) => {
    const partnersFiltered = state.partners.filter(
      (item: any) => item._id !== partner._id
    );

    partnersFiltered.push(partner);

    return {
      ...state,
      partners: partnersFiltered,
    };
  }),

  on(actions.ADD_PARTNER_SUCCESS, (state, { partner }) => {
    return {
      ...state,
      partners: [...state.partners, partner],
    };
  }),

  on(actions.ADD_PARTNER_ERROR, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.DELETE_PARTNER_SUCCESS, (state, { payload }) => {
    const userId = payload;
    return {
      ...state,
      partners: state.partners.filter((partner: any) => partner._id !== userId),
    };
  }),

  on(actions.DELETE_PARTNER_ERROR, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function partnersReducer(
  state: PartnersState | undefined,
  action: Action
) {
  return _partnersReducer(state, action);
}
