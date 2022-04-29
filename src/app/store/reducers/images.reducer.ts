import { Action, createReducer, on } from '@ngrx/store';
import actions from '../actions/images.actions';

export interface ImagesState {
  images: any[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const imagesInitialState: ImagesState = {
  images: [],
  loaded: false,
  loading: false,
  error: null,
};

const _imagesReducer = createReducer(
  imagesInitialState,

  on(actions.LOAD_IMAGES, (state) => ({
    ...state,
    loading: true,
  })),

  on(actions.LOAD_IMAGES_SUCCESS, (state, { images }) => ({
    ...state,
    loading: false,
    loaded: true,
    images: [...images],
  })),

  on(actions.LOAD_IMAGES_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.ADD_IMAGE_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      images: [...state.images, payload],
    };
  }),

  on(actions.ADD_IMAGE_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(actions.DELETE_IMAGE_SUCCESS, (state, { payload }) => {
    const imageId = payload;
    return {
      ...state,
      images: state.images.filter((image: any) => image._id !== imageId),
    };
  }),

  on(actions.DELETE_IMAGE_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function imagesReducer(state: ImagesState | undefined, action: Action) {
  return _imagesReducer(state, action);
}
