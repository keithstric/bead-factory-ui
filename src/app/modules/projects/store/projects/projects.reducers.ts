import {AppState} from '@core/root-store/models/app-state.model';
import {RawProject} from '@modules/projects/interfaces/projects.interface';
import {iProjectsState} from '@modules/projects/store/models/projects-state.model';
import {ProjectsAction, ProjectsActionTypes} from '@modules/projects/store/projects/projects.actions';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

export const selectProjectId = (a: RawProject) => a.id;

export const projectsAdapter: EntityAdapter<RawProject> = createEntityAdapter<RawProject>({
	selectId: selectProjectId
});

const initialProjectsState: iProjectsState = projectsAdapter.getInitialState({
	loaded: false,
	loading: false,
	error: undefined
});

export function ProjectsReducer(state: iProjectsState = initialProjectsState, action: ProjectsAction) {
	switch (action.type) {
		case ProjectsActionTypes.CreateProjectSuccess:
			return projectsAdapter.setOne(action.payload, state);
		case ProjectsActionTypes.CreateProjectFailure:
			return {...state, error: action.payload};
		case ProjectsActionTypes.GetProjectsSuccess:
			return projectsAdapter.setAll(action.payload, {...state, loaded: true, loading: false});
		case ProjectsActionTypes.GetProjectsFailure:
			return {...state, loaded: false, loading: false, error: action.payload};
		case ProjectsActionTypes.GetProjectSuccess:
			return projectsAdapter.addOne(action.payload, state);
		case ProjectsActionTypes.GetProjectFailure:
			return {...state, error: action.payload};
		case ProjectsActionTypes.UpdateProjectSuccess:
			return projectsAdapter.setOne(action.payload, state);
		case ProjectsActionTypes.UpdateProjectFailure:
			return {...state, error: action.payload};
		case ProjectsActionTypes.DeleteProjectSuccess:
			console.log('DeleteProjectSuccess, action=', action);
			return projectsAdapter.removeOne(action.payload, state);
		case ProjectsActionTypes.DeleteProjectFailure:
			return {...state, error: action.payload};
	}
	return state;
}

export const getProjectsState = (state: AppState) => state.projects.projects;
export const getProjectsLoading = (state: iProjectsState) => state.loading;
export const getProjectsLoaded = (state: AppState) => state.projects.projects.loaded;
export const getProjectsError = (state: iProjectsState) => state.error;
