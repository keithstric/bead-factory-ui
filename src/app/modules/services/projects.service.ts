import {Injectable} from '@angular/core';
import {ApiMethod} from '@core/interfaces/api.interface';
import {HttpService} from '@core/services/http/http.service';
import {RawProject} from '@modules/projects/interfaces/projects.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
		private _http: HttpService
	) { }

	getProjects() {
		return this._http.doRequest('/api/projects', ApiMethod.GET);
	}

	getProject(projectId: string) {
		return this._http.doRequest(`/api/project/${projectId}`, ApiMethod.GET);
	}

	deleteProject(projectId: string) {
		return this._http.doRequest(`/api/project/${projectId}`, ApiMethod.DELETE);
	}

	updateProject(project: RawProject) {
		return this._http.doRequest(`/api/project/${project.projectId}`, ApiMethod.PUT);
	}
}
