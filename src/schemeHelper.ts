import { Scheme } from './settings';
import { App, normalizePath } from 'obsidian';
import { defaultSounds } from './defaultSound';
import { Howl } from 'howler';

export class SchemeHelper {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	async getBase64URL(path: string) {
		const data = await new Blob(
			[await this.app.vault.adapter.readBinary(path)],
			{
				type: 'audio/wav',
			}
		).arrayBuffer();
		const b64 = btoa(String.fromCharCode(...new Uint8Array(data)));
		return 'data:audio/wav;base64,' + b64;
	}

	async loadScheme(scheme: Scheme) {
		if (scheme.id === 'default') return defaultSounds;

		//TODO: catch error and set sound package fallback
		const keyStr = await this.getBase64URL(scheme.sounds.key);
		const key2Str = await this.getBase64URL(scheme.sounds.key2);
		const enterStr = await this.getBase64URL(scheme.sounds.enter);
		const spaceStr = await this.getBase64URL(scheme.sounds.space);
		const deleteStr = await this.getBase64URL(scheme.sounds.delete);

		const sounds = {
			key: new Howl({ src: keyStr, preload: true }),
			key2: new Howl({ src: key2Str, preload: true }),
			enter: new Howl({ src: enterStr, preload: true }),
			space: new Howl({ src: spaceStr, preload: true }),
			delete: new Howl({ src: deleteStr, preload: true }),
		};

		return sounds;
	}

	async getScheme(name: string) {
		const schemePath = normalizePath(
			[
				this.app.vault.configDir,
				'plugins',
				'click-clack',
				'resources',
				name,
			].join('/')
		);
		const manifestPath = normalizePath(
			[schemePath, 'manifest.json'].join('/')
		);

		if (await this.app.vault.adapter.exists(manifestPath)) {
			const manifest = JSON.parse(
				await this.app.vault.adapter.read(manifestPath)
			);
			return {
				id: manifest['id'] as string,
				caption: manifest['caption'] as string,
				sounds: {
					key: [schemePath, manifest['key'] as string].join('/'),
					key2: [schemePath, manifest['key2'] as string].join('/'),
					space: [schemePath, manifest['space'] as string].join('/'),
					enter: [schemePath, manifest['enter'] as string].join('/'),
					delete: [schemePath, manifest['delete'] as string].join(
						'/'
					),
				},
			} as Scheme;
		}
	}

	async getInstalledSchemes() {
		const resourcePath = normalizePath(
			[
				this.app.vault.configDir,
				'plugins',
				'click-clack',
				'resources',
			].join('/')
		);
		if (!(await this.app.vault.adapter.exists(resourcePath))) return;

		const paths = await this.app.vault.adapter.list(resourcePath);

		const schemes = await Promise.all(
			paths.folders.map(async (f) => {
				const manifestPath = normalizePath(
					[f, 'manifest.json'].join('/')
				);
				if (await this.app.vault.adapter.exists(manifestPath)) {
					const manifest = JSON.parse(
						await this.app.vault.adapter.read(manifestPath)
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
}
