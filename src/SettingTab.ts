import ClickClackPlugin, { Sounds } from './main';
import { PluginSettingTab, Setting, App, DropdownComponent } from 'obsidian';
import { getScheme, getInstalledSchemes, loadScheme } from './schemeHelpers';
import { defaultScheme } from './defaultSound';
import { checkOrDownload } from './fetchHelpers';

export class ClickClackSettingTab extends PluginSettingTab {
	plugin: ClickClackPlugin;

	constructor(app: App, plugin: ClickClackPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	async display(): Promise<void> {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Enable sound')
			.setDesc('Enable / disable sound temporarily.')
			.addToggle((toggle) => {
				toggle
					.setTooltip('toggle to another state (dynamic str later)')
					.setValue(this.plugin.settings.enabled)
					.onChange(async (value) => {
						this.plugin.settings.enabled = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName('Volume')
			.setDesc('Adjust keyboard sound volume.')
			.addSlider((slider) => {
				slider
					.setLimits(0.0, 100, 1.0)
					.setValue(this.plugin.settings.volumn ?? 100)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.volumn = value;
						Object.keys(this.plugin.sounds).forEach((k) =>
							this.plugin.sounds[k as keyof Sounds].volume(
								value / 100
							)
						);
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl).setName('Sound resource').setHeading();

		const schemeSetting = new Setting(containerEl)
			.setName('Scheme')
			.setDesc('Select scheme.')
			.addExtraButton((button) => {
				button.setIcon('refresh-cw').onClick(async () => {
					dropdown.selectEl.empty();
					dropdown
						.addOptions({ default: 'Default' })
						.addOptions(await getInstalledSchemes())
						.setValue(this.plugin.settings.activeScheme.id);
				});
			});

		const dropdown = new DropdownComponent(schemeSetting.controlEl);
		dropdown
			.addOptions({ default: 'Default' })
			.addOptions(await getInstalledSchemes())
			.setValue(this.plugin.settings.activeScheme.id)
			.onChange(async (value) => {
				const scheme = (await getScheme(value)) ?? defaultScheme;
				this.plugin.settings.activeScheme = scheme;
				this.plugin.sounds = await loadScheme(scheme);
				await this.plugin.saveSettings();
			});

		new Setting(containerEl)
			.setName('Download')
			.setDesc(
				'Fetching resources from github release. Please refresh the scheme list after resources are successfully downloaded.'
			)
			.addButton((button) =>
				button
					.setCta()
					.setButtonText('Download')
					.setIcon('download')
					.onClick(async () => {
						await checkOrDownload();
					})
			);
	}
}
