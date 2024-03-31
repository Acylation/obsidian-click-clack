import ClickClackPlugin, { Sounds } from './main';
import { PluginSettingTab, Setting, App, DropdownComponent } from 'obsidian';
import { getScheme, getInstalledSchemes, loadScheme } from './schemeHelpers';
import { defaultScheme } from './defaultSound';
import { checkOrDownload } from './fetchHelpers';
import { i18n } from './libs/i18n';

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
			.setName(i18n.t('settings.toggle-sound.name'))
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.enabled)
					.onChange(async (value) => {
						this.plugin.settings.enabled = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(i18n.t('settings.volume.name'))
			.setDesc(i18n.t('settings.volume.desc'))
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

		new Setting(containerEl)
			.setName(i18n.t('settings.resource'))
			.setHeading();

		const schemeSetting = new Setting(containerEl)
			.setName(i18n.t('settings.scheme.name'))
			.addExtraButton((button) => {
				button.setIcon('refresh-cw').onClick(async () => {
					dropdown.selectEl.empty();
					dropdown
						.addOptions({
							default: i18n.t('settings.scheme.default'),
						})
						.addOptions(await getInstalledSchemes())
						.setValue(this.plugin.settings.activeScheme.id);
				});
			});

		const dropdown = new DropdownComponent(schemeSetting.controlEl);
		dropdown
			.addOptions({ default: i18n.t('settings.scheme.default') })
			.addOptions(await getInstalledSchemes())
			.setValue(this.plugin.settings.activeScheme.id)
			.onChange(async (value) => {
				const scheme = (await getScheme(value)) ?? defaultScheme;
				this.plugin.settings.activeScheme = scheme;
				this.plugin.sounds = await loadScheme(scheme);
				await this.plugin.saveSettings();
			});

		new Setting(containerEl)
			.setName(i18n.t('settings.download.name'))
			.setDesc(i18n.t('settings.download.desc'))
			.addButton((button) =>
				button
					.setCta()
					.setButtonText(i18n.t('settings.download.button'))
					.setIcon('download')
					.onClick(async () => {
						await checkOrDownload();
					})
			);
	}
}
