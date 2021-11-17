import { createAction, props } from '@ngrx/store';
import { Partner } from 'src/app/core/models/partner.model';

export const LOAD_PARTNERS = createAction('[Partners] Load Partners');

export const LOAD_PARTNERS_SUCCESS = createAction(
  '[Partners] Load Partners Success',
  props<{ partners: Partner[] }>()
);

export const LOAD_PARTNERS_ERROR = createAction(
  '[Partners] Load Partners Error',
  props<{ payload: any }>()
);

export const UPDATE_PARTNER = createAction(
  '[Partners] Update partner',
  props<{ partner: Partner }>()
);

export const UPDATE_PARTNER_SUCCESS = createAction(
  '[Partners] Update partner success',
  props<{ partner: any }>()
);

export const UPDATE_PARTNER_ERROR = createAction(
  '[Partners] Update partner error',
  props<{ payload: any }>()
);

export const ADD_PARTNER = createAction(
  '[Partners] Add partner',
  props<{ payload: any }>()
);

export const ADD_PARTNER_SUCCESS = createAction(
  '[Partners] Add partners success',
  props<{ partner: any }>()
);

export const ADD_PARTNER_ERROR = createAction(
  '[Partners] Add partners error',
  props<{ payload: any }>()
);

export const DELETE_PARTNER = createAction(
  '[Partners] Delete partner',
  props<{ payload: any }>()
);

export const DELETE_PARTNER_SUCCESS = createAction(
  '[Partners] Delete partner success',
  props<{ payload: any }>()
);

export const DELETE_PARTNER_ERROR = createAction(
  '[Partners] Delete partner error',
  props<{ payload: any }>()
);
