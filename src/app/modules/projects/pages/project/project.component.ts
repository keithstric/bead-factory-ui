import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {selectForms} from '@core/root-store/forms/forms.selectors';
import {ProjectType, RawProject} from '@modules/projects/interfaces/projects.interface';
import {CreateProjectAction, GetProjectsAction, SetCurrentProjectAction} from '@modules/projects/store';
import {selectAllProjects, selectLoaded, selectProjectById} from '@modules/projects/store/projects/projects.selectors';
import {Store} from '@ngrx/store';
import {FormGroupDefinition, FormGroupObjectConfig} from '@shared/services/form-helper/form-helper.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit, OnDestroy {
	shownPhase: TemplateRef<any>;
	formGroup: FormGroup;
	projectIdSubj: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
	project: RawProject;
	subscriptions: Subscription = new Subscription();

	@ViewChild('projectForm') projFormTemplate: TemplateRef<any>;
	@ViewChild('editProject') editProjTemplate: TemplateRef<any>;

	constructor(
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private store: Store
	) {}

	get fgDefinition(): FormGroupDefinition {
		return {
			formGroupObject: this.newProject,
			formGroupConfig: this.fgConfig
		};
	}

	get newProject(): RawProject {
		return {
			name: '',
			type: undefined,
			lengthInInches: 0,
			widthInBeads: 0,
			description: ''
		};
	}

	get fgConfig(): FormGroupObjectConfig {
		return {
			type: {
				fieldType: 'select',
				fieldLabel: 'Type',
				options: this.projectTypes
			},
			description: {
				fieldType: 'textarea',
				fieldLabel: 'Description'
			},
			lengthInInches: {
				fieldType: 'number',
				fieldLabel: 'Length in Inches'
			}
		};
	}

	get projectTypes() {
		return Object.keys(ProjectType).map((key) => `${key}|${ProjectType[key]}`);
	}

	get projectId() {
		return this.projectIdSubj.value;
	}

	ngOnInit() {
		this._listenToRoute();
		this._listenToStore();
	}

	/**
	 * Get the projectId from the route
	 * @private
	 */
	private _listenToRoute() {
		this._activeRoute.paramMap
			.pipe(take(1))
			.subscribe((params) => {
				this.projectIdSubj.next(params.get('id'));
			});
	}

	/**
	 * - Get the form if showing the form and update the project
	 * - Get all projects if we don't have them
	 * - Get the single project if we have a projectId
	 * @private
	 */
	private _listenToStore() {
		// Get the form
		this.subscriptions.add(
			this.store.select(selectForms).subscribe((formsState) => {
				if (formsState.project) {
					this.project = formsState.project;
				}
			})
		);
		// Get all projects
		this.subscriptions.add(
			this.store.select(selectLoaded).subscribe((loaded) => {
				if (!loaded) {
					this.store.dispatch(new GetProjectsAction());
				}
			})
		);
		// Get the project related to the projectId
		this.subscriptions.add(
			this.store.select(selectAllProjects).subscribe((projects) => {
				if (projects?.length && this.projectId) {
					if (this.projectId) {
						this.store.select(selectProjectById(this.projectId)).subscribe((project) => {
							this.project = project;
						});
					}
				}
			})
		);
	}

	ngAfterViewInit(): void {
		// Determine the view which is rendered
		if (this._router.url.endsWith('/new')) {
			this.shownPhase = this.projFormTemplate;
		}else{
			this.shownPhase = this.editProjTemplate;
		}
	}

	ngOnDestroy() {}

	/**
	 * Get the formGroup from the dynamic form
	 * @param formGroup
	 */
	onFormInit(formGroup: FormGroup) {
		this.formGroup = formGroup;
	}

	/**
	 * Save the new project form
	 */
	saveProject() {
		this.store.dispatch(new CreateProjectAction(this.formGroup.value));
	}

}
