import { createAction, props } from '@ngrx/store';

export default {
  LOAD_IMAGES: createAction('[Images] Load images'),
  LOAD_IMAGES_SUCCESS: createAction(
    '[Images] Load images success',
    props<{ images: any[] }>()
  ),
  LOAD_IMAGES_FAILURE: createAction(
    '[Images] Load images failure',
    props<{ payload: any[] }>()
  ),
  ADD_IMAGE: createAction('[Images] Add image', props<{ payload: any }>()),
  ADD_IMAGE_SUCCESS: createAction(
    '[Images] Add image success',
    props<{ payload: any }>()
  ),
  ADD_IMAGE_FAILURE: createAction(
    '[Images] Add image failure',
    props<{ payload: any }>()
  ),
  DELETE_IMAGE: createAction(
    '[Images] Delete image',
    props<{ payload: any }>()
  ),
  DELETE_IMAGE_SUCCESS: createAction(
    '[Images] Delete image success',
    props<{ payload: any }>()
  ),
  DELETE_IMAGE_FAILURE: createAction(
    '[Images] Delete image failure',
    props<{ payload: any }>()
  ),
};
