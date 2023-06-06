import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
	rows: RawBeadDisplay[][] = [];
	shownContextMenuBead: RawBeadDisplay;

	constructor() {
	}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.lengthInInches || changes.rowCount) {
			this._sortBeads();
		}
	}

	private _sortBeads() {
		const beads = this.beads || [];
		if (!this.beads?.length) {
			if (this.rowCount) {
				for (let y = 1; y <= this.rowCount; y++) {
					for (let x = 1; x <= (this.lengthInInches * 10); x++) {
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
		}
		for (let y = 1; y <= this.rowCount; y++) {
			const rowBeads = beads
				.filter(bead => bead.y === y)
				.sort((a, b) => {
					return a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
				});
			this.rows.push(rowBeads);
		}
	}

	private _getBeadInBeads(x: number, y: number): RawBeadDisplay {
		return this.beads.find((bead) => bead.x === x && bead.y === y);
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

	@HostListener('document:click')
	documentClick() {
		if (this.shownContextMenuBead?.contextMenuVisible) {
			this.shownContextMenuBead.contextMenuVisible = false;
		}
	}
}
