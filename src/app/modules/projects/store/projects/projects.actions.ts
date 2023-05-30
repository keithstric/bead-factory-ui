import {RawProject} from '@modules/projects/interfaces/projects.interface';
import {Action} from '@ngrx/store';

export enum ProjectsActionTypes {
	GetProjects = '[Projects] Get Projects',
	GetProjectsSuccess = '[Projects] Get Projects Success',
	GetProjectsFailure = '[Projects] Get Projects Failure',
	GetProject = '[Projects] Get Project',
	GetProjectSuccess = '[Projects] Get Project Success',
	GetProjectFailure = '[Projects] Get Project Failure',
	UpdateProject = '[Projects] Update Project',
	UpdateProjectSuccess = '[Projects] Update Project Success',
	UpdateProjectFailure = '[Projects] Update Project Failure',
	DeleteProject = '[Projects] Delete Project',
	DeleteProjectSuccess = '[Projects] Delete Project Success',
	DeleteProjectFailure = '[Projects] Delete Project Failure',
}

export class GetProjectsAction implements Action {
	readonly type = ProjectsActionTypes.GetProjects;
	constructor() {}
}

export class GetProjectsSuccessAction implements Action {
	readonly type = ProjectsActionTypes.GetProjectsSuccess;
	constructor(public payload: RawProject[]) {}
}

export class GetProjectsFailureAction implements Action {
	readonly type = ProjectsActionTypes.GetProjectsFailure;
	constructor(public payload: Error) {}
}

export class GetProjectAction implements Action {
	readonly type = ProjectsActionTypes.GetProject;
	constructor(public payload: string) {}
}

export class GetProjectSuccessAction implements Action {
	readonly type = ProjectsActionTypes.GetProjectSuccess;
	constructor(public payload: RawProject) {}
}

export class GetProjectFailureAction implements Action {
	readonly type = ProjectsActionTypes.GetProjectFailure;
	constructor(public payload: Error) {}
}

export class UpdateProjectAction implements Action {
	readonly type = ProjectsActionTypes.UpdateProject;
	constructor(public payload: RawProject) {}
}

export class UpdateProjectSuccessAction implements Action {
	readonly type = ProjectsActionTypes.UpdateProjectSuccess;
	constructor(public payload: RawProject) {}
}

export class UpdateProjectFailureAction implements Action {
	readonly type = ProjectsActionTypes.UpdateProjectFailure;
	constructor(public payload: Error) {}
}

export class DeleteProjectAction implements Action {
	readonly type = ProjectsActionTypes.DeleteProject;
	constructor(public payload: string) {}
}

export class DeleteProjectSuccessAction implements Action {
	readonly type = ProjectsActionTypes.DeleteProjectSuccess;
	constructor(public payload: string) {}
}

export class DeleteProjectFailureAction implements Action {
	readonly type = ProjectsActionTypes.DeleteProjectFailure;
	constructor(public payload: Error) {}
}

export type ProjectsAction = GetProjectsAction
	| GetProjectsSuccessAction
	| GetProjectsFailureAction
	| GetProjectAction
	| GetProjectSuccessAction
	| GetProjectFailureAction
	| UpdateProjectAction
	| UpdateProjectSuccessAction
	| UpdateProjectFailureAction
	| DeleteProjectAction
	| DeleteProjectSuccessAction
	| DeleteProjectFailureAction;
