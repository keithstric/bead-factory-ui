import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from '@modules/projects/pages/projects/projects.component';

export const projectsRoutes: Routes = [
	{
		path: '',
		component: ProjectsComponent
	}
]

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule { }
