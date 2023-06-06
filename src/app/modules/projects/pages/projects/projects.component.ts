import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from '@layout/services/layout/layout.service';
import {ExternalEvents} from '@modules/projects/interfaces/external-events.interface';
import {RawProject} from '@modules/projects/interfaces/projects.interface';
import {
	ProjectsHeaderComponent
} from '@modules/projects/pages/projects/components/projects-header/projects-header.component';
import {ProjectsService} from '@modules/projects/services/projects.service';
import {
	CreateProjectAction,
	DeleteProjectAction,
	GetProjectsAction,
	SetCurrentProjectAction
} from '@modules/projects/store';
import {selectAllProjects, selectLoaded} from '@modules/projects/store/projects/projects.selectors';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
	projects: RawProject[] = [];
	subscriptions: Subscription = new Subscription();

	constructor(
		private _projects: ProjectsService,
		private _layout: LayoutService,
		private store: Store,
		private _router: Router
	) {}

	ngOnInit(): void {
		this._layout.setHeader(ProjectsHeaderComponent);
		this._listenToStore();
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	private _listenToStore() {
		this.subscriptions.add(
			this.store.select(selectLoaded).subscribe((loaded) => {
				if (!loaded) {
					this.store.dispatch(new GetProjectsAction());
				}
			})
		);

		this.subscriptions.add(
			this.store.select(selectAllProjects)
			.subscribe((projects) => {
				this.projects = projects;
			})
		);
	}

	openProject(project: RawProject) {
		this.store.dispatch(new SetCurrentProjectAction(project.id, this._router));
	}

	deleteProject(evt: Event, project: RawProject) {
		evt.stopPropagation();
		this.store.dispatch(new DeleteProjectAction(project.id));
	}

	duplicateProject(evt: Event, project: RawProject) {
		evt.stopPropagation();
		const dupeProj = Object.assign(project);
		delete dupeProj.id;
		dupeProj.name = `${project.name}-DUPLICATE`;
		this.store.dispatch(new CreateProjectAction(dupeProj));
	}
}
