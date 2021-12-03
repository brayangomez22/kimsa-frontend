import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import actions from '../actions/clients.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { showResponseModal } from 'src/app/core/utils/alerts';
import { ClientsService } from 'src/app/core/services/clients.service';

@Injectable()
export class ClientsEffect {
  constructor(
    private actions$: Actions,
    private service: ClientsService,
  ) { }

  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LOAD_CLIENTS),
      mergeMap(() =>
        this.service.get().pipe(
          map(({ clients }) => actions.LOAD_CLIENTS_SUCCESS({ clients })),
          catchError((err) => of(actions.LOAD_CLIENTS_FAILURE({ payload: err })))
        )
      )
    )
  );

  addClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ADD_CLIENT),
      mergeMap((client) =>
        this.service.create(client).pipe(
          map((response) => {
            showResponseModal('success', 'Cliente creado exitosamente...');
            return actions.ADD_CLIENT_SUCCESS({
              payload: response.clientSaved,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No pudimos crear el cliente...');
            return of(actions.ADD_CLIENT_FAILURE({ payload: err }));
          })
        )
      )
    )
  );

  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DELETE_CLIENT),
      mergeMap(({ payload }) =>
        this.service.delete(payload).pipe(
          map((response) => {
            showResponseModal('success', 'Cliente eliminado exitosamente...');
            return actions.DELETE_CLIENT_SUCCESS({
              payload: response.client._id,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No logramos eliminar el cliente...');
            return of(actions.DELETE_CLIENT_FAILURE({ payload: err }));
          })
        )
      )
    )
  );
}
