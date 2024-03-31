export interface keySoundMap {
	// writing system keys
	KeyA: string;
	KeyB: string;
	KeyC: string;
	KeyD: string;
	KeyE: string;
	KeyF: string;
	KeyG: string;
	KeyH: string;
	KeyI: string;
	KeyJ: string;
	KeyK: string;
	KeyL: string;
	KeyM: string;
	KeyN: string;
	KeyO: string;
	KeyP: string;
	KeyQ: string;
	KeyR: string;
	KeyS: string;
	KeyT: string;
	KeyU: string;
	KeyV: string;
	KeyW: string;
	KeyX: string;
	KeyY: string;
	KeyZ: string;
	Digit1: string;
	Digit2: string;
	Digit3: string;
	Digit4: string;
	Digit5: string;
	Digit6: string;
	Digit7: string;
	Digit8: string;
	Digit9: string;
	Digit0: string;

	Backquote: string;
	Minus: string;
	Equal: string;
	BracketLeft: string;
	BracketRight: string;
	Quote: string;
	Semicolon: string;
	Comma: string;
	Period: string;
	Slash: string;

	IntlYen: string;
	Backslash: string;
	IntlBackslash: string;
	IntlRo: string;

	// functioanl keys
	Backspace: string;
	Tab: string;
	Capslock: string;
	Enter: string;
	ShiftLeft: string;
	ShiftRight: string;
	ControlLeft: string;
	ControlRight: string;
	MetaLeft: string;
	MetaRight: string;
	AltLeft: string;
	AltRight: string;
	Space: string;
	ContextMenu: string;

	Convert: string;
	NonConvert: string;
	KanaMode: string;
	Lang1: string;
	Lang2: string;
	Lang3: string;
	Lang4: string;
	Lang5: string;

	// control pad
	Insert: string;
	Delete: string;
	Help: string;
	Home: string;
	End: string;
	PageUp: string;
	PageDown: string;

	// arrow pad
	ArrowLeft: string;
	ArrowRight: string;
	ArrowUp: string;
	ArrowDown: string;

	// numpad
	Numpad0: string;
	Numpad1: string;
	Numpad2: string;
	Numpad3: string;
	Numpad4: string;
	Numpad5: string;
	Numpad6: string;
	Numpad7: string;
	Numpad8: string;
	Numpad9: string;
	NumLock: string;
	NumpadDivide: string;
	NumpadMultiply: string;
	NumpadSubstract: string;
	NumpadAdd: string;
	NumpadComma: string;
	NumpadEnter: string;
	NumpadDecimal: string;
	NumpadEqual: string;
	NumpadBackspace: string;

	// function section
	Escape: string;
	F1: string;
	F2: string;
	F3: string;
	F4: string;
	F5: string;
	F6: string;
	F7: string;
	F8: string;
	F9: string;
	F10: string;
	F11: string;
	F12: string;
	Fn: string;
	FnLock: string;
	PrintScreen: string;
	ScrollLock: string;
	Pause: string;

	// media keys
	AudioVolumeUp: string;
	AudioVolumeDown: string;
	AudioVolumnMute: string;
}

export const DEFAULT_MAP: keySoundMap = {
	// writing system keys
	KeyA: 'key',
	KeyB: 'key',
	KeyC: 'key',
	KeyD: 'key2',
	KeyE: 'key2',
	KeyF: 'key',
	KeyG: 'key2',
	KeyH: 'key',
	KeyI: 'key',
	KeyJ: 'key2',
	KeyK: 'key',
	KeyL: 'key2',
	KeyM: 'key2',
	KeyN: 'key2',
	KeyO: 'key2',
	KeyP: 'key',
	KeyQ: 'key2',
	KeyR: 'key',
	KeyS: 'key2',
	KeyT: 'key2',
	KeyU: 'key2',
	KeyV: 'key2',
	KeyW: 'key',
	KeyX: 'key2',
	KeyY: 'key',
	KeyZ: 'key',
	Digit1: 'key',
	Digit2: 'key',
	Digit3: 'key',
	Digit4: 'key',
	Digit5: 'key',
	Digit6: 'key',
	Digit7: 'key',
	Digit8: 'key',
	Digit9: 'key',
	Digit0: 'key',

	Backquote: 'key',
	Minus: 'key',
	Equal: 'key',
	BracketLeft: 'key',
	BracketRight: 'key',
	Quote: 'key',
	Semicolon: 'key',
	Comma: 'key',
	Period: 'key',
	Slash: 'key',

	IntlYen: 'key',
	Backslash: 'key',
	IntlBackslash: 'key',
	IntlRo: 'key',

	// functioanl keys
	Backspace: 'delete',
	Tab: 'key',
	Capslock: '', // 打字机专用声音
	Enter: 'enter',
	ShiftLeft: '', // 需要加逻辑判断了
	ShiftRight: '',
	ControlLeft: '',
	ControlRight: '',
	MetaLeft: '',
	MetaRight: '',
	AltLeft: '',
	AltRight: '',
	Space: 'space',
	ContextMenu: '', // code 93, right cmd

	Convert: '',
	NonConvert: '',
	KanaMode: '',
	Lang1: '',
	Lang2: '',
	Lang3: '',
	Lang4: '',
	Lang5: '',

	// control pad
	Insert: '',
	Delete: 'delete',
	Help: '',
	Home: '',
	End: '',
	PageUp: '',
	PageDown: '',

	// arrow pad
	ArrowLeft: '',
	ArrowRight: '',
	ArrowUp: '',
	ArrowDown: '',

	// numpad
	// TODO: 回校后用大键盘和 MacOS 键盘调试这个
	Numpad0: 'key',
	Numpad1: 'key',
	Numpad2: 'key',
	Numpad3: 'key',
	Numpad4: 'key',
	Numpad5: 'key',
	Numpad6: 'key',
	Numpad7: 'key',
	Numpad8: 'key',
	Numpad9: 'key', // check numlock logic
	NumLock: '', // something like shift in typewriter
	NumpadDivide: 'key',
	NumpadMultiply: 'key',
	NumpadSubstract: 'key',
	NumpadAdd: 'key',
	NumpadComma: 'key',
	NumpadEnter: 'enter',
	NumpadDecimal: 'key',
	NumpadEqual: 'key',
	NumpadBackspace: 'backspace',

	// function section
	Escape: '',
	F1: '',
	F2: '',
	F3: '',
	F4: '',
	F5: '',
	F6: '',
	F7: '',
	F8: '',
	F9: '',
	F10: '',
	F11: '',
	F12: '',
	Fn: '',
	FnLock: '',
	PrintScreen: '',
	ScrollLock: '',
	Pause: '',

	// media keys
	AudioVolumeUp: '',
	AudioVolumeDown: '',
	AudioVolumnMute: '',
};
