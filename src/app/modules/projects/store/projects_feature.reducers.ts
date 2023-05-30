import {AppState} from '@core/root-store/models/app-state.model';
import {ProjectsFeatureState} from '@modules/projects/store/models/projects-state.model';
import {ProjectsFeatureAction, ProjectsFeatureActionTypes} from '@modules/projects/store/projects_feature.actions';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromProjects from '@modules/projects/store/projects';


export const ProjectsFeatureReducersMap: ActionReducerMap<ProjectsFeatureState> = {
	projects: fromProjects.ProjectsReducer,
	currentProjectId: CurrentProjectReducer
};

export function CurrentProjectReducer(state: string, action: ProjectsFeatureAction) {
	switch (action.type) {
		case ProjectsFeatureActionTypes.SELECT_ONE_PROJECT:
			return action.payload;
	}
	return state;
}

export const selectProjectsFeature = createFeatureSelector<ProjectsFeatureState>('projects');
export const getCurrentProjectId = (state: AppState) => state.projects.currentProjectId;
