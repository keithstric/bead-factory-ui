import {Injectable} from '@angular/core';
import {ApiMethod} from '@core/interfaces/api.interface';
import {HttpService} from '@core/services/http/http.service';
import {ExternalEvents} from '@modules/projects/interfaces/external-events.interface';
import {RawProject} from '@modules/projects/interfaces/projects.interface';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProjectsService {
	externalEventSubj = new BehaviorSubject<ExternalEvents>(undefined);

	constructor(
		private _http: HttpService
	) {
	}

	createProject(project: RawProject) {
		return this._http.doRequest('/api/projects', ApiMethod.POST, project);
	}

	getProjects() {
		return this._http.doRequest('/api/projects', ApiMethod.GET);
	}

	getProject(projectId: string) {
		return this._http.doRequest(`/api/projects/${projectId}`, ApiMethod.GET);
	}

	deleteProject(projectId: string) {
		return this._http.doRequest(`/api/projects/${projectId}`, ApiMethod.DELETE);
	}

	updateProject(project: Partial<RawProject>) {
		return this._http.doRequest(`/api/projects/${project.id}`, ApiMethod.PATCH, project);
	}

	announceExternalEvent(payload: any) {
		this.externalEventSubj.next(payload);
	}
}
