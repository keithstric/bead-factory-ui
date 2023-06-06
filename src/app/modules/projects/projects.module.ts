import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@layout/layout.module';
import {ProjectsRoutingModule} from '@modules/projects/projects-routing.module';
import {ProjectsEffects} from '@modules/projects/store/projects/projects.effects';
import {ProjectsFeatureReducersMap} from '@modules/projects/store/projects_feature.reducers';
import {ProjectsService} from '@modules/projects/services/projects.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {SharedModule} from '@shared/shared.module';
import {ProjectsComponent} from './pages/projects/projects.component';
import {ProjectsHeaderComponent} from './pages/projects/components/projects-header/projects-header.component';
import {ProjectComponent} from './pages/project/project.component';
import { BeadPatternComponent } from '@modules/projects/pages/project/components/bead-pattern/bead-pattern.component';


@NgModule({
	declarations: [
		ProjectsComponent,
		ProjectsHeaderComponent,
		ProjectComponent,
  	BeadPatternComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ProjectsRoutingModule,
		StoreModule.forFeature('projects', ProjectsFeatureReducersMap),
		EffectsModule.forFeature([
			ProjectsEffects
		]),
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		ProjectsService
	]
})
export class ProjectsModule {
}
