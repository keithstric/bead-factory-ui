export enum ProjectType {
	Necklace = 'necklace',
	Bracelet = 'bracelet',
	Hat_Band = 'hat band',
	Bag = 'bag',
	Ring = 'ring'
}

export enum BeadTypes {
	GLASS = 'glass',
	SEED = 'seed',
	LAMPWORK = 'lampwork',
	PONY = 'pony',
	SUGAR = 'sugar',
	ACRYLIC = 'acrylic',
	CERAMIC = 'ceramic',
	WOOD = 'wood',
	SEMI_PRECIOUS = 'semi precious',
	FAUX = 'faux',
	CRYSTAL = 'crystal',
	PERLER = 'perler',
	METAL = 'metal',
	PAPER = 'paper',
	PEBBLE = 'pebble',
	BEADED = 'beaded',
	LAVA = 'lava',
	CULTURED_PEARL = 'cultured pearl',
	COSTUME_PEARL = 'costume pearl',
	NATURAL = 'natural'
}

export enum BeadShapes {
	CYLINDER = 'cylinder',
	PINCH = 'pinch',
	PELLET = 'pellet',
	BUGLE = 'bugle',
	ROUNDEL = 'roundel',
	TRIANGULAR = 'triangular',
	DROP = 'drop',
	FACETED = 'faceted',
	TRUE_CUT = 'true cut',
	CHARLOTTE = 'charlotte',
	SEQUINS = 'sequins',
	FLATBACK = 'flatback',
	DONUT	= 'donut',
	PIGGY = 'piggy',
	TILA = 'tila',
	OBLONG = 'oblong',
}

export interface RawProject {
	id?: string;
	name: string;
	type: ProjectType | undefined;
	description: string;
	lengthInInches?: number;
	widthInBeads?: number;
	createdAtTimestamp?: string;
	modifiedAtTimestamp?: string;
	beads?: RawBead[];
}

export interface RawBead {
	beadId?: string;
	color: string;
	manufacturer: string;
	manufacturerColor: string;
	nameBrand: string;
	shape: BeadShapes;
	size: number;
	type: BeadTypes;
	x?: number;
	y?: number;
}
