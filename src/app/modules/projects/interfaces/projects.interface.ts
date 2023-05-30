export enum ProjectType {
	Necklace = 'necklace',
	Bracelet = 'bracelet',
	Hat_Band = 'hat_band',
	Bag = 'bag',
	Ring = 'ring'
}

export enum BeadType {
	Metallic = 'metallic',
	Opaque = 'opaque',
	Solid = 'solid',
	Glass = 'glass'
}

export interface RawProject {
	projectId: string;
	name: string;
	type: ProjectType;
	lengthInInches?: number;
	createdAtTimestamp: string;
	modifiedAtTimestamp?: string;
}

export interface Bead {
	beadId: string;
	x?: number;
	y?: number;
	manufacturer: string;
	size: number;
	color: string;
	manufacturerColor: string;
	type: BeadType;
}
