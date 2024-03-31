import { normalizePath, requestUrl, Notice } from 'obsidian';
import * as path from 'path';
import { githubAsset } from 'typings/githubAsset';
import * as zip from '@zip.js/zip.js';

const unzip = async (zipFile: string) => {
	const blob = new Blob([await app.vault.adapter.readBinary(zipFile)], {
		type: 'octet/stream',
	});
	const entries = await new zip.ZipReader(
		new zip.BlobReader(blob)
	).getEntries();

	const basePath = normalizePath(
		path.join(app.vault.configDir, 'plugins', 'click-clack', 'resources')
	);
	checkOrCreateFolder(basePath);

	const folders = entries.filter((e) => e.directory);
	folders.forEach(async (e) =>
		checkOrCreateFolder(path.join(basePath, e.filename))
	);
	const files = entries.filter((e) => !e.directory);
	files.forEach(async (e) => {
		if (await app.vault.adapter.exists(path.join(basePath, e.filename)))
			return;
		if (!e || !e.getData) return;
		await app.vault.adapter.writeBinary(
			path.join(basePath, e.filename),
			await (
				await e.getData(new zip.BlobWriter('audio/wav'), {})
			).arrayBuffer()
		);
	});
};

const checkOrCreateFolder = async (name: string) => {
	if (await app.vault.adapter.exists(name)) return;
	await app.vault.adapter.mkdir(name);
};

export const checkOrDownload = async () => {
	const resourcePath = normalizePath(
		path.join(app.vault.configDir, 'plugins', 'click-clack', 'resources')
	);
	const zipPath = normalizePath(
		path.join(
			app.vault.configDir,
			'plugins',
			'click-clack',
			'resources.zip'
		)
	);

	checkOrCreateFolder(resourcePath);
	if (await app.vault.adapter.exists(zipPath)) {
		unzip(zipPath);
	} else {
		await download('resources.zip', zipPath);
		unzip(zipPath);
	}
};

const download = async (name: string, localPath: string) => {
	new Notice(`Click clack: Downloading ${name}!`, 5000);
	try {
		await fetchAsset(name, localPath);
		new Notice(
			`Click clack: Resource ${name} successfully downloaded! ✔️`,
			5000
		);
	} catch (error) {
		new Notice(`Click clack: Failed to fetch ${name}: ${error} ❌`);
		throw Error(`Failed to fetch resource ${name} from GitHub release.`);
	}
};

const fetchAsset = async (target: string, localPath: string) => {
	const assetInfo = await requestUrl(
		`https://api.github.com/repos/acylation/obsidian-click-clack/releases/tags/${
			app.plugins.getPlugin('click-clack')?.manifest.version ?? '0.1.0'
		}`
	).json;
	const asset = assetInfo.assets.find((a: githubAsset) => a.name == target);
	if (asset === undefined) throw Error('Could not find the online asset!');

	const data = await requestUrl({
		url: asset.url,
		headers: { Accept: 'application/octet-stream' },
	}).arrayBuffer;
	await app.vault.adapter.writeBinary(localPath, data);
};
