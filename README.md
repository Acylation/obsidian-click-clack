# Obsidian Click Clack

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22click-clack%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

[简体中文](README-ZH.md) | [English](README.md)

Simulates typewriter / mechanical keyboard sounds in Obsidian.

> [!Note]
> Latest release: 0.1.2  
> Document version: 0.1.2  

## Installation

This plugin is still in early development. Currently it's unavailable from the plugin market. You can download this manually or using BRAT plugin.

### Manually install

Go to the [latest release](https://github.com/Acylation/obsidian-click-clack/releases/latest) page, download `main.js` and `manifest.json` and put the in the directory of `[yourvault]/.obsidian/plugins/click-clack`.

A default sound resource is bundled with the plugin. If you want more variants, you can find the `Download` button in the plugin's settings tab. Clicking it would fetch the `resources.zip` from the release page and unzip it to the directory of `[yourvault]/.obsidian/plugins/click-clack/resources`. You can also manually download and unzip the resources if there's error with automatical download.

### Install via BRAT

You can add register this repo path in the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin to install and get updated.

## Configurations

In the plugin's settings tab, you can adjust sound volume for all keys, toggle on/off key sounds and select your favorite sound schemes.

You can also toggle on/off the key sounds via command palette (`Ctrl` + `P`), searching for `enable click clack sound` or `disable click clack sound`.

## Credits

This project is based on forum discussion <https://forum.obsidian.md/t/typewriter-sounds/15474>, where contains many valuable design suggestions.

The first batch of sound schemes are taken from the Click Clack plugin of [Writemonkey 3](https://writemonkey.com/wm3/index.php). Thank you so much for the charming resources!

## Roadmap

- Settings interface
  - Custom sources (common, return?, ping?,)
    - Recorder and sound editor integration / workflow
  - Adapt resources
    - Monkey type
    - Mechvibes
- Handle controller chars
- Handle non-editor region
  - include canvas md embed node
