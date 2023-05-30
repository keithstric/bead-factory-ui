import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from '@layout/services/layout/layout.service';


/**
 * Please keep in mind this is a demo home component. You will probably want to replace this
 * component with your own
 */
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	constructor(
		private _layout: LayoutService
	) {}

	ngOnInit(): void { }

	ngOnDestroy() {}
}
