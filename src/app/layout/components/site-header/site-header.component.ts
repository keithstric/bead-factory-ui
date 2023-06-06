import {Component} from '@angular/core';
import {PROJECT_NAME} from 'src/environments/environment';

/**
 * The default header
 * Use the @link {LayoutService} to set the header
 *
 * @example
 *
 * ```
 * constructor(private _layout: LayoutService){}
 *
 * setHeader() {
 *   this._layout.setHeader(SomeHeaderComponent);
 * }
 * ```
 */
@Component({
	selector: 'app-header',
	templateUrl: './site-header.component.html',
	styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {
	title: string = PROJECT_NAME;

	constructor() {}

}
