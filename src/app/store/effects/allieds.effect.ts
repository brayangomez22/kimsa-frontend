import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import  actions from '../actions/allieds.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { showResponseModal } from 'src/app/core/utils/alerts';
import { AlliedsService } from 'src/app/core/services/allieds.service';

@Injectable()
export class AlliedsEffect {
  constructor(
    private actions$: Actions,
    private service: AlliedsService
  ) {}

  loadAllieds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LOAD_ALLIEDS),
      mergeMap(() =>
        this.service.get().pipe(
          map(({ allieds }) => actions.LOAD_ALLIEDS_SUCCESS({ allieds })),
          catchError((err) => of(actions.LOAD_ALLIEDS_FAILURE({ payload: err })))
        )
      )
    )
  );

  addAllied$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ADD_ALLIED),
      mergeMap((allied) =>
        this.service.create(allied).pipe(
          map((response) => {
            showResponseModal('success', 'Aliado creado exitosamente...');
            return actions.ADD_ALLIED_SUCCESS({
              payload: response.alliedSaved,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No pudimos crear el aliado...');
            return of(actions.ADD_ALLIED_FAILURE({ payload: err }));
          })
        )
      )
    )
  );

  deleteAllied$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DELETE_ALLIED),
      mergeMap((partnerId) =>
        this.service.delete(partnerId.payload).pipe(
          map((response) => {
            showResponseModal('success', 'Aliado eliminado exitosamente...');
            return actions.DELETE_ALLIED_SUCCESS({
              payload: response.allied._id,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No logramos eliminar el aliado...');
            return of(actions.DELETE_ALLIED_FAILURE({ payload: err }));
          })
        )
      )
    )
  );
}
