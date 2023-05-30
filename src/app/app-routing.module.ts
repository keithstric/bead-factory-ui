import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '@layout/components/page-not-found/page-not-found.component';

/**
 * This defines the application's routes. All base routes should be lazy loaded.
 * @type {Routes}
 */
export const appRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'projects'
			},{
				path: 'projects',
				loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)
			}
		]
	},
	{path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
