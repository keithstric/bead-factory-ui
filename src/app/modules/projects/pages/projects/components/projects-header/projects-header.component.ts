import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExternalEvents} from '@modules/projects/interfaces/external-events.interface';
import {ProjectsService} from '@modules/projects/services/projects.service';
import {PROJECT_NAME} from 'src/environments/environment';

@Component({
	selector: 'app-projects-header',
	templateUrl: './projects-header.component.html',
	styleUrls: ['./projects-header.component.scss']
})
export class ProjectsHeaderComponent implements OnInit {
	title = PROJECT_NAME;

	constructor(
		private _projects: ProjectsService,
		private _router: Router
	) {}

	ngOnInit(): void {
	}


	createProject() {
		this._router.navigateByUrl('projects/new');
		this._projects.announceExternalEvent(ExternalEvents.CREATE_PROJECT);
	}
}
