import { normalizePath, requestUrl, Notice, App } from 'obsidian';
import { githubAsset } from 'typings/githubAsset';
import * as zip from '@zip.js/zip.js';

export class FetchHelper {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	unzip = async (zipFile: string) => {
		const blob = new Blob(
			[await this.app.vault.adapter.readBinary(zipFile)],
			{
				type: 'octet/stream',
			}
		);
		const entries = await new zip.ZipReader(
			new zip.BlobReader(blob)
		).getEntries();

		const basePath = normalizePath(
			[
				this.app.vault.configDir,
				'plugins',
				'click-clack',
				'resources',
			].join('/')
		);
		this.checkOrCreateFolder(basePath);

		const folders = entries.filter((e) => e.directory);
		folders.forEach(async (e) =>
			this.checkOrCreateFolder([basePath, e.filename].join('/'))
		);
		const files = entries.filter((e) => !e.directory);
		files.forEach(async (e) => {
			if (
				await this.app.vault.adapter.exists(
					[basePath, e.filename].join('/')
				)
			)
				return;
			if (!e || !e.getData) return;
			await this.app.vault.adapter.writeBinary(
				[basePath, e.filename].join('/'),
				await (
					await e.getData(new zip.BlobWriter('audio/wav'), {})
				).arrayBuffer()
			);
		});
	};

	checkOrCreateFolder = async (name: string) => {
		if (await this.app.vault.adapter.exists(name)) return;
		await this.app.vault.adapter.mkdir(name);
	};

	checkOrDownload = async () => {
		const resourcePath = normalizePath(
			[
				this.app.vault.configDir,
				'plugins',
				'click-clack',
				'resources',
			].join('/')
		);
		const zipPath = normalizePath(
			[
				this.app.vault.configDir,
				'plugins',
				'click-clack',
				'resources.zip',
			].join('/')
		);

		this.checkOrCreateFolder(resourcePath);
		if (await this.app.vault.adapter.exists(zipPath)) {
			this.unzip(zipPath);
		} else {
			await this.download('resources.zip', zipPath);
			this.unzip(zipPath);
		}
	};

	download = async (name: string, localPath: string) => {
		new Notice(`Click Clack: Downloading ${name}!`, 5000);
		try {
			await this.fetchAsset(name, localPath);
			new Notice(
				`Click Clack: Resource ${name} successfully downloaded! ✔️`,
				5000
			);
		} catch (error) {
			new Notice(`Click Clack: Failed to fetch ${name}: ${error} ❌`);
			throw Error(
				`Failed to fetch resource ${name} from GitHub release.`
			);
		}
	};

	fetchAsset = async (target: string, localPath: string) => {
		const assetInfo = await requestUrl(
			`https://api.github.com/repos/acylation/obsidian-click-clack/releases/tags/${
				this.app.plugins.getPlugin('click-clack')?.manifest.version ??
				'0.1.0'
			}`
		).json;
		const asset = assetInfo.assets.find(
			(a: githubAsset) => a.name == target
		);
		if (asset === undefined)
			throw Error('Could not find the online asset!');

		const data = await requestUrl({
			url: asset.url,
			headers: { Accept: 'application/octet-stream' },
		}).arrayBuffer;
		await this.app.vault.adapter.writeBinary(localPath, data);
	};
}
