import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/partners.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PartnersService } from 'src/app/core/services/partners.service';
import { showResponseModal } from 'src/app/core/utils/alerts';

@Injectable()
export class PartnersEffects {
  constructor(
    private actions$: Actions,
    private _partnersService: PartnersService
  ) {}

  loadPartners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LOAD_PARTNERS),
      mergeMap(() =>
        this._partnersService.getPartners().pipe(
          map((partners) => actions.LOAD_PARTNERS_SUCCESS({ partners })),
          catchError((err) => of(actions.LOAD_PARTNERS_ERROR({ payload: err })))
        )
      )
    )
  );

  addPartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ADD_PARTNER),
      mergeMap((newPartner) =>
        this._partnersService.createPartner(newPartner).pipe(
          map((response) => {
            showResponseModal('success', 'Socio creado exitosamente...');
            return actions.ADD_PARTNER_SUCCESS({
              partner: response,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No pudimos crear el socio...');
            return of(actions.ADD_PARTNER_ERROR({ payload: err }));
          })
        )
      )
    )
  );

  deletePartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DELETE_PARTNER),
      mergeMap((partnerId) =>
        this._partnersService.deletePartner(partnerId.payload).pipe(
          map((response) => {
            showResponseModal('success', 'Socio eliminado exitosamente...');
            return actions.DELETE_PARTNER_SUCCESS({
              payload: response._id,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No logramos eliminar el socio...');
            return of(actions.DELETE_PARTNER_ERROR({ payload: err }));
          })
        )
      )
    )
  );

  updatePartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UPDATE_PARTNER),
      mergeMap(({ partner }) =>
        this._partnersService.editPartner(partner.id, partner).pipe(
          map((response) => {
            showResponseModal('success', 'Socio editado exitosamente...');
            return actions.UPDATE_PARTNER_SUCCESS({
              partner: response,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No logramos editar el socio...');
            return of(actions.UPDATE_PARTNER_ERROR({ payload: err }));
          })
        )
      )
    )
  );
}
