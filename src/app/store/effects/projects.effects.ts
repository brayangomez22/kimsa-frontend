import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as projectsActions from '../actions/projects.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProjectsService } from 'src/app/core/services/projects.service';
import { showResponseModal } from 'src/app/core/utils/alerts';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private _projectsService: ProjectsService
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectsActions.LOAD_PROJECTS),
      mergeMap(() =>
        this._projectsService.getProjects().pipe(
          map(({ projects }) =>
            projectsActions.LOAD_PROJECTS_SUCCESS({ projects })
          ),
          catchError((err) =>
            of(projectsActions.LOAD_PROJECTS_ERROR({ payload: err }))
          )
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectsActions.ADD_PROJECT),
      mergeMap((newProject) =>
        this._projectsService.createProject(newProject).pipe(
          map((response) => {
            showResponseModal('success', 'Proyecto creado exitosamente...');
            return projectsActions.ADD_PROJECT_SUCCESS({
              project: response.projectSaved,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No pudimos crear el proyecto...');
            return of(projectsActions.ADD_PROJECT_ERROR({ payload: err }));
          })
        )
      )
    )
  );

  deleteroject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectsActions.DELETE_PROJECT),
      mergeMap((projectId) =>
        this._projectsService.deleteProject(projectId.payload).pipe(
          map((response) => {
            showResponseModal('success', 'Proyecto eliminado exitosamente...');
            return projectsActions.DELETE_PROJECT_SUCCESS({
              payload: response.project._id,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No logramos eliminar el proyecto...');
            return of(projectsActions.DELETE_PROJECT_ERROR({ payload: err }));
          })
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectsActions.UPDATE_PROJECT),
      mergeMap(({ project }) =>
        this._projectsService.editProject(project.id, project).pipe(
          map((response) => {
            showResponseModal('success', 'Proyecto editado exitosamente...');
            return projectsActions.UPDATE_PROJECT_SUCCESS({
              project: response.projectUpdated,
            });
          }),
          catchError((err) => {
            showResponseModal('error', 'No logramos editar el proyecto...');
            return of(projectsActions.UPDATE_PROJECT_ERROR({ payload: err }));
          })
        )
      )
    )
  );
}
