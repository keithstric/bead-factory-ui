import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LayoutService} from '@layout/services/layout/layout.service';
import {BeadShapes, BeadTypes, RawBead} from '@modules/projects/interfaces/projects.interface';
import {MenuItemClickedEvent} from '@shared/interfaces/context-menu.interface';
import {SelectElementOption} from '@shared/interfaces/select-element-option.interface';

interface RawBeadDisplay extends RawBead {
	contextMenuData?: SelectElementOption[];
	contextMenuVisible?: boolean;
}

@Component({
	selector: 'app-bead-pattern',
	templateUrl: './bead-pattern.component.html',
	styleUrls: ['./bead-pattern.component.scss']
})
export class BeadPatternComponent implements OnInit, OnChanges {
	@Input() beads: RawBead[] = [];
	@Input() rowCount: number = 0;
	@Input() lengthInInches: number = 0;
	_columnCount: number = 0;
	rows: RawBeadDisplay[][] = [];
	shownContextMenuBead: RawBeadDisplay;

	constructor() {}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges) {
		console.log('[ngOnChanges] changes=', changes);
		if (changes.lengthInInches.currentValue || changes.rowCount.currentValue) {
			this._sortBeads();
		}
	}

	get columnCount() {
		if (this._columnCount === 0) {
			this._columnCount = this.lengthInInches * 10;
		}
		return this._columnCount;
	}

	set columnCount(columnCount: number) {
		this._columnCount = columnCount;
	}

	private _sortBeads() {
		const startingBeadCount = this.beads?.length;
		const beads = this.beads || [];
		const rowCount = this.rowCount === 0 ? 50 : this.rowCount;
		for (let y = 1; y <= rowCount; y++) {
			for (let x = 1; x <= this.columnCount; x++) {
				if (!this.rows[y - 1] || (this.rows[y - 1] && !this.rows[y - 1][x - 1])) {
					const bead: RawBeadDisplay = {
						x,
						y,
						color: undefined,
						type: BeadTypes.SEED,
						size: 0,
						shape: BeadShapes.CYLINDER,
						manufacturer: undefined,
						manufacturerColor: undefined,
						nameBrand: undefined,
						contextMenuVisible: false
					};
					bead.contextMenuData = [{value: bead, label: 'Reset Color'}];
					beads.push(bead);
				}
			}
		}
		const endingBeadCount = beads.length;
		if (this.rows.length !== this.rowCount) {
			for (let y = 1; y <= rowCount; y++) {
				if (!this.rows[y - 1]) {
					const rowBeads = beads
						.filter(bead => bead.y === y)
						.sort((a, b) => {
							return a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
						});
					this.rows.push(rowBeads);
				}
			}
		}else if (this.rows.length === this.rowCount && startingBeadCount < endingBeadCount) {
			for (let y = 1; y <= rowCount; y++) {
				const rowBeads = beads
					.filter(bead => bead.y === y)
					.sort((a, b) => {
						return a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
					});
				if (this.rows[y - 1]?.length !== rowBeads.length) {
					this.rows[y - 1] = rowBeads;
				}
			}
		}
	}

	private _getBeadInBeads(x: number, y: number): RawBeadDisplay {
		return this.beads.find((bead) => bead.x === x && bead.y === y);
	}

	private _isRowEmpty(bead: RawBeadDisplay) {
		const rowCols = this.rows[bead.y - 1];
		let isEmpty = true;
		// tslint:disable-next-line:prefer-for-of
		for (let i = 0; i < rowCols.length; i++) {
			const currBead = rowCols[i];
			if (currBead.color) {
				isEmpty = false;
				break;
			}
		}
		return isEmpty;
	}

	updateColor(evt, clickedBead: RawBeadDisplay) {
		const targetBead = this._getBeadInBeads(clickedBead.x, clickedBead.y);
		targetBead.color = evt.target.value;
	}

	showContextMenu(evt, clickedBead: RawBeadDisplay) {
		const targetBead = this._getBeadInBeads(clickedBead.x, clickedBead.y);
		targetBead.contextMenuVisible = true;
		this.shownContextMenuBead = targetBead;
	}

	contextMenuItemClick(evtPayload: MenuItemClickedEvent) {
		const {item, clickedLabel} = evtPayload;
		const targetBead = this._getBeadInBeads(item.x, item.y);
		if (clickedLabel === 'Reset Color') {
			targetBead.color = undefined;
		}
		targetBead.contextMenuVisible = false;
		this.shownContextMenuBead = targetBead;
	}

	addRowColumn(type: 'row' | 'column') {
		if (type === 'row') {
			this.rowCount = this.rowCount + 1;
			this._sortBeads();
		}else if (type === 'column') {
			this.columnCount = this.columnCount + 1;
			this._sortBeads();
		}
	}

	/**
	 * Close the context menu
	 */
	@HostListener('document:click')
	documentClick() {
		if (this.shownContextMenuBead?.contextMenuVisible) {
			this.shownContextMenuBead.contextMenuVisible = false;
		}
	}
}
