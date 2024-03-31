import { Scheme } from './settings';
import { normalizePath } from 'obsidian';
import * as path from 'path';
import { defaultSounds } from './defaultSound';
import { Howl } from 'howler';

async function getBase64URL(path: string) {
	const data = await new Blob([await app.vault.adapter.readBinary(path)], {
		type: 'audio/wav',
	}).arrayBuffer();
	const b64 = btoa(String.fromCharCode(...new Uint8Array(data)));
	return 'data:audio/wav;base64,' + b64;
}

export async function loadScheme(scheme: Scheme) {
	if (scheme.id === 'default') return defaultSounds;

	//TODO: catch error and set sound package fallback
	const keyStr = await getBase64URL(scheme.sounds.key);
	const key2Str = await getBase64URL(scheme.sounds.key2);
	const enterStr = await getBase64URL(scheme.sounds.enter);
	const spaceStr = await getBase64URL(scheme.sounds.space);
	const deleteStr = await getBase64URL(scheme.sounds.delete);

	const sounds = {
		key: new Howl({ src: keyStr, preload: true }),
		key2: new Howl({ src: key2Str, preload: true }),
		enter: new Howl({ src: enterStr, preload: true }),
		space: new Howl({ src: spaceStr, preload: true }),
		delete: new Howl({ src: deleteStr, preload: true }),
	};

	return sounds;
}

export async function getScheme(name: string) {
	const schemePath = normalizePath(
		path.join(
			app.vault.configDir,
			'plugins',
			'click-clack',
			'resources',
			name
		)
	);
	const manifestPath = normalizePath(path.join(schemePath, 'manifest.json'));

	if (await app.vault.adapter.exists(manifestPath)) {
		const manifest = JSON.parse(await app.vault.adapter.read(manifestPath));
		return {
			id: manifest['id'] as string,
			caption: manifest['caption'] as string,
			sounds: {
				key: path.join(schemePath, manifest['key'] as string),
				key2: path.join(schemePath, manifest['key2'] as string),
				space: path.join(schemePath, manifest['space'] as string),
				enter: path.join(schemePath, manifest['enter'] as string),
				delete: path.join(schemePath, manifest['delete'] as string),
			},
		} as Scheme;
	}
}

export async function getInstalledSchemes() {
	const resourcePath = normalizePath(
		path.join(app.vault.configDir, 'plugins', 'click-clack', 'resources')
	);
	if (!(await app.vault.adapter.exists(resourcePath))) return;

	const paths = await app.vault.adapter.list(resourcePath);

	const schemes = await Promise.all(
		paths.folders.map(async (f) => {
			const manifestPath = normalizePath(path.join(f, 'manifest.json'));
			if (await app.vault.adapter.exists(manifestPath)) {
				const manifest = JSON.parse(
					await app.vault.adapter.read(manifestPath)
				);
				return [
					manifest['id'] as string,
					manifest['caption'] as string,
				];
			}
			return [
				f,
				f
					.split('-')
					.map((s) => s[0].toUpperCase() + s.substring(1))
					.join(' '),
			];
		})
	);

	return Object.fromEntries(schemes);
}
