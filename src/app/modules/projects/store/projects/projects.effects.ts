import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SetCurrentProjectAction} from '@modules/projects/store';
import {
	CreateProjectAction,
	CreateProjectFailureAction,
	CreateProjectSuccessAction,
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
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

@Injectable()
export class ProjectsEffects {

	constructor(
		private actions: Actions,
		private _projectService: ProjectsService,
		private _router: Router
	) {}

	createProject = createEffect(() => this.actions
		.pipe(
			ofType<CreateProjectAction>(ProjectsActionTypes.CreateProject),
			switchMap(action => this._projectService.createProject(action.payload)
				.pipe(
					switchMap(project => of(
						new CreateProjectSuccessAction(project),
						new SetCurrentProjectAction(project.id, this._router)
					)),
					catchError(err => of(new CreateProjectFailureAction(err)))
				))
		));

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
			ofType<DeleteProjectAction>(ProjectsActionTypes.DeleteProject),
			mergeMap(action => this._projectService.deleteProject(action.payload)
				.pipe(
					map(projects => new DeleteProjectSuccessAction(projects.id)),
					catchError(err => of(new DeleteProjectFailureAction(err)))
				))
		));
}
