import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as path from 'path';

const AUDIO_ID = 'typewriter-sound-plugin-audio';

interface TWSoundSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: TWSoundSettings = {
	mySetting: 'default',
};

export default class TWSoundPlugin extends Plugin {
	settings: TWSoundSettings;

	async onload() {
		await this.loadSettings();

		const audioEl = document.createElement('audio');
		audioEl.id = AUDIO_ID;
		document.body.appendChild(audioEl);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'keydown', (evt: KeyboardEvent) => {
			audioEl.src = buildPluginStaticResourceSrc(
				this,
				'resource/selectric-mode/selectric-type.wav'
			);
			audioEl.play();
		});
	}

	onunload() {
		document.getElementById(AUDIO_ID)?.remove();
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// https://forum.obsidian.md/t/support-for-assets-in-plugins/25837/2
export function buildPluginStaticResourceSrc(plug: Plugin, assetPath: string) {
	return plug.app.vault.adapter.getResourcePath(
		path.join(
			plug.app.vault.configDir,
			'plugins',
			plug.manifest.id,
			assetPath
		)
	);
}

class SampleSettingTab extends PluginSettingTab {
	plugin: TWSoundPlugin;

	constructor(app: App, plugin: TWSoundPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder('Enter your secret')
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
