export interface Scheme {
	id: string;
	caption: string;
	sounds: {
		key: string;
		key2: string;
		enter: string;
		space: string;
		delete: string;
	};
}

export interface ClickClackSettings {
	version: string;
	enabled: boolean;
	activeScheme: Scheme;
	volumn: number;
}

export const DEFAULT_SETTINGS_V1: ClickClackSettings = {
	version: 'version1',
	enabled: true,
	activeScheme: {
		id: 'default',
		caption: 'Default',
		sounds: {
			key: '',
			key2: '',
			space: '',
			enter: '',
			delete: '',
		},
	},
	volumn: 100,
};
