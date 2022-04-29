import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import actions from '../actions/images.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { showResponseModal } from 'src/app/core/utils/alerts';
import { ImagesService } from 'src/app/core/services/images.service';

@Injectable()
export class ImagesEffect {
  constructor(private actions$: Actions, private service: ImagesService) {}

  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LOAD_IMAGES),
      mergeMap(() =>
        this.service.get().pipe(
          map((images) => actions.LOAD_IMAGES_SUCCESS({ images })),
          catchError((err) => of(actions.LOAD_IMAGES_FAILURE({ payload: err })))
        )
      )
    )
  );

  addImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ADD_IMAGE),
      mergeMap((image) =>
        this.service.create(image).pipe(
          map((response) => {
            showResponseModal('success', 'Imagen creada exitosamente...');
            return actions.ADD_IMAGE_SUCCESS({
              payload: response,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No pudimos crear la imagen...');
            return of(actions.ADD_IMAGE_FAILURE({ payload: err }));
          })
        )
      )
    )
  );

  deleteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DELETE_IMAGE),
      mergeMap(({ payload }) =>
        this.service.delete(payload).pipe(
          map((response) => {
            showResponseModal('success', 'Imagen eliminada exitosamente...');
            return actions.DELETE_IMAGE_SUCCESS({
              payload: response._id,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No logramos eliminar la imagen...');
            return of(actions.DELETE_IMAGE_FAILURE({ payload: err }));
          })
        )
      )
    )
  );
}
