import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MenuItemClickedEvent} from '@shared/interfaces/context-menu.interface';
import {SelectElementOption} from '@shared/interfaces/select-element-option.interface';
import {BsDropdownDirective} from 'ngx-bootstrap/dropdown';

@Component({
	selector: 'app-context-menu',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnChanges {
	@Input() dropdownItems: SelectElementOption[] = [];
	@Input() isVisible: boolean = false;

	@Output() menuItemClicked: EventEmitter<MenuItemClickedEvent> = new EventEmitter<MenuItemClickedEvent>();
	@ViewChild('dropdown') bsDropdownRef: BsDropdownDirective;

	constructor() {	}

	ngOnInit(): void {	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.bsDropdownRef) {
			changes.isVisible?.currentValue === true
				? this.bsDropdownRef.show()
				: this.bsDropdownRef.hide();
		}
	}

	itemClicked(clickedLabel: string, item: SelectElementOption) {
		const payload: MenuItemClickedEvent = {clickedLabel, item};
		this.menuItemClicked.emit(payload);
	}

}
