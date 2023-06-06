import {createSelector} from '@ngrx/store';
import * as fromProjects from './projects.reducers';

export const selectProjectsState = createSelector(
	fromProjects.getProjectsState,
	(state) => state
);

export const selectAllProjects = createSelector(
	selectProjectsState,
	fromProjects.projectsAdapter.getSelectors().selectAll
);

export const selectLoaded = createSelector(
	fromProjects.getProjectsLoaded,
	(loaded) => {
		return loaded;
	}
);

export const selectProjectById = (id: string) => createSelector(
	selectProjectsState,
	state => state.entities[id]
);

export const selectProjectsByIds = (ids: string[]) => createSelector(
	selectProjectsState,
	state => ids.map(id => state.entities[id])
);


