import {
	defaultKey,
	defaultKey2,
	defaultSpace,
	defaultEnter,
	defaultDelete,
} from './default';

import { Howl } from 'howler';

export const defaultSounds = {
	key: new Howl({ src: defaultKey, preload: true }),
	key2: new Howl({ src: defaultKey2, preload: true }),
	space: new Howl({ src: defaultSpace, preload: true }),
	enter: new Howl({ src: defaultEnter, preload: true }),
	delete: new Howl({ src: defaultDelete, preload: true }),
};

export const defaultScheme = {
	id: 'default',
	caption: 'Default',
	sounds: { key: '', key2: '', enter: '', space: '', delete: '' },
};
