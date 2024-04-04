import { Plugin, App, PluginManifest } from 'obsidian';

import { DEFAULT_MAP, keySoundMap } from './keySoundMap';
import { ClickClackSettings, DEFAULT_SETTINGS_V1 } from './settings';
import { ClickClackSettingTab } from './SettingTab';

export interface Sounds {
	key: Howl;
	key2: Howl;
	enter: Howl;
	space: Howl;
	delete: Howl;
}
import { defaultSounds } from './defaultSound';
import { SchemeHelper } from './schemeHelper';

export default class ClickClackPlugin extends Plugin {
	settings: ClickClackSettings;
	sounds: Sounds;
	schemeHelper: SchemeHelper;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.sounds = defaultSounds;
		this.schemeHelper = new SchemeHelper(app);
	}

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ClickClackSettingTab(this.app, this));
		this.sounds = await this.schemeHelper.loadScheme(
			this.settings.activeScheme
		);
		this.registerDomEvent(
			this.app.workspace.containerEl,
			'keydown',
			(evt: KeyboardEvent) => {
				if (!this.settings.enabled) return;
				if (evt.ctrlKey) return;
				if (evt.metaKey) return;
				if (evt.altKey && !evt.ctrlKey && !evt.metaKey) return;
				// if (evt.repeat) return;

				// this.stopSounds(); // stop overlaid
				this.sounds[
					DEFAULT_MAP[evt.code as keyof keySoundMap] as keyof Sounds
				]?.play();
			}
		);

		this.addCommand({
			id: 'enable click clack sound',
			name: 'enable click clack sound',
			checkCallback: (checking: boolean) => {
				if (checking) return !this.settings.enabled;
				this.toggleSound(true);
			},
		});

		this.addCommand({
			id: 'disable click clack sound',
			name: 'disable click clack sound',
			checkCallback: (checking: boolean) => {
				if (checking) return this.settings.enabled;
				this.toggleSound(false);
			},
		});
	}

	onunload() {
		this.unloadSounds();
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS_V1,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async toggleSound(targetState: boolean) {
		this.settings.enabled = targetState;
		await this.saveSettings();
	}

	async refreshSounds() {
		this.sounds = await this.schemeHelper.loadScheme(
			this.settings.activeScheme
		);
	}

	stopSounds() {
		for (const key in this.sounds) {
			this.sounds[key as keyof Sounds].stop();
		}
	}

	unloadSounds() {
		for (const key in this.sounds) {
			this.sounds[key as keyof Sounds].unload();
		}
	}
}
