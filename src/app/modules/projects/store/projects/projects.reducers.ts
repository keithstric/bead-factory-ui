import {RawProject} from '@modules/projects/interfaces/projects.interface';
import {iProjectsState} from '@modules/projects/store/models/projects-state.model';
import {ProjectsActionTypes, ProjectsAction} from '@modules/projects/store/projects/projects.actions';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

export const selectProjectId = (a: RawProject) => a.projectId;

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
			return projectsAdapter.removeOne(action.payload, state);
		case ProjectsActionTypes.DeleteProjectFailure:
			return {...state, error: action.payload};
	}
	return state;
}
