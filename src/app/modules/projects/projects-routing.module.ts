import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from '@modules/projects/pages/project/project.component';
import {ProjectsComponent} from '@modules/projects/pages/projects/projects.component';

export const projectsRoutes: Routes = [
	{
		path: '',
		component: ProjectsComponent
	}, {
		path: 'new',
		component: ProjectComponent
	}, {
		path: ':id',
		component: ProjectComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule { }
