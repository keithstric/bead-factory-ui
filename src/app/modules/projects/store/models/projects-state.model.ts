import {RawProject} from '@modules/projects/interfaces/projects.interface';
import {EntityState} from '@ngrx/entity';

export interface ProjectsFeatureState {
	projects: iProjectsState;
	currentProjectId: string;
}

export interface iProjectsState extends EntityState<RawProject> {
	loaded: boolean;
	loading: boolean;
	error: Error | undefined;
}

