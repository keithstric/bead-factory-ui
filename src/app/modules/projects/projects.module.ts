import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsRoutingModule} from '@modules/projects/projects-routing.module';
import {ProjectsEffects} from '@modules/projects/store/projects/projects.effects';
import {ProjectsFeatureReducersMap} from '@modules/projects/store/projects_feature.reducers';
import {ProjectsService} from '@modules/services/projects.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import { ProjectsComponent } from './pages/projects/projects.component';


@NgModule({
	declarations: [
    ProjectsComponent
  ],
	imports: [
		CommonModule,
		ProjectsRoutingModule,
		StoreModule.forFeature('projects', ProjectsFeatureReducersMap),
		EffectsModule.forFeature([
			ProjectsEffects
		])
	],
	providers: [
		ProjectsService
	]
})
export class ProjectsModule { }
