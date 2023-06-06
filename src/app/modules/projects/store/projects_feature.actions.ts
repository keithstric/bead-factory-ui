import {Router} from '@angular/router';
import {Action} from '@ngrx/store';

export enum ProjectsFeatureActionTypes {
	SetCurrentProject = 	'[Projects Feature] Set Current Project'
}

export class SetCurrentProjectAction implements Action {
	readonly type = ProjectsFeatureActionTypes.SetCurrentProject;
	constructor(public payload: string, private router: Router) {
		if (payload) {
			router.navigateByUrl(`/projects/${payload}`);
		}
	}
}

export type ProjectsFeatureAction = SetCurrentProjectAction;
