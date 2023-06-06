import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '@layout/components/page-not-found/page-not-found.component';
import {SiteFooterComponent} from '@layout/components/site-footer/site-footer.component';
import {SiteHeaderComponent} from '@layout/components/site-header/site-header.component';
import {NgxBootstrapModule} from '@layout/modules/ngx-bootstrap/ngx-bootstrap.module';
import {LayoutService} from '@layout/services/layout/layout.service';
import {LoadingService} from '@layout/services/loading/loading.service';
import {SharedModule} from '@shared/shared.module';

const components = [
	PageNotFoundComponent,
	SiteFooterComponent,
	SiteHeaderComponent,
];

/**
 * The LayoutModule
 */
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		NgxBootstrapModule
	],
	declarations: [
		...components
	],
	exports: [
		...components,
		NgxBootstrapModule
	],
	providers: [
		LayoutService,
		LoadingService
	],
	entryComponents: [
		SiteHeaderComponent,
		SiteFooterComponent
	]
})
export class LayoutModule { }
