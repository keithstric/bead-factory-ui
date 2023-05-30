import {Action} from '@ngrx/store';

export enum ProjectsFeatureActionTypes {
	SELECT_ONE_PROJECT = 	'[Projects Feature] Select One Project'
}

export class SelectOneProjectAction implements Action {
	readonly type = ProjectsFeatureActionTypes.SELECT_ONE_PROJECT;
	constructor(public payload: string) {}
}

export type ProjectsFeatureAction = SelectOneProjectAction;
