import {Injectable} from '@angular/core';
import {
	DeleteProjectAction, DeleteProjectFailureAction, DeleteProjectSuccessAction,
	GetProjectAction,
	GetProjectFailureAction,
	GetProjectsAction, GetProjectsFailureAction, GetProjectsSuccessAction,
	GetProjectSuccessAction,
	ProjectsActionTypes, UpdateProjectAction, UpdateProjectFailureAction, UpdateProjectSuccessAction
} from '@modules/projects/store/projects/projects.actions';
import {ProjectsService} from '@modules/projects/services/projects.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ProjectsEffects {

	constructor(
		private actions: Actions,
		private _projectService: ProjectsService
	) {}

	getProjects = createEffect(() => this.actions
		.pipe(
			ofType<GetProjectsAction>(ProjectsActionTypes.GetProjects),
			mergeMap(action => this._projectService.getProjects()
				.pipe(
					map(projects => new GetProjectsSuccessAction(projects)),
					catchError(err => of(new GetProjectsFailureAction(err)))
				))
		));

	getProject = createEffect(() => this.actions
		.pipe(
			ofType<GetProjectAction>(ProjectsActionTypes.GetProject),
			mergeMap(action => this._projectService.getProject(action.payload)
				.pipe(
					map(projects => new GetProjectSuccessAction(projects)),
					catchError(err => of(new GetProjectFailureAction(err)))
				))
		));

	updateProject = createEffect(() => this.actions
		.pipe(
			ofType<UpdateProjectAction>(ProjectsActionTypes.UpdateProject),
			mergeMap(action => this._projectService.updateProject(action.payload)
				.pipe(
					map(project => new UpdateProjectSuccessAction(project)),
					catchError(err => of(new UpdateProjectFailureAction(err)))
				))
		));

	deleteProject = createEffect(() => this.actions
		.pipe(
			ofType<DeleteProjectAction>(ProjectsActionTypes.GetProjects),
			mergeMap(action => this._projectService.deleteProject(action.payload)
				.pipe(
					map(projects => new DeleteProjectSuccessAction(projects)),
					catchError(err => of(new DeleteProjectFailureAction(err)))
				))
		));
}
