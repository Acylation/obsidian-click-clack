# Obsidian Click Clack

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22click-clack%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

[English](README.md) | [简体中文](README-ZH.md)

在 Obsidian 中模拟机械键盘、打字机按键音。

> [!Note]
> 最新插件版本: 0.1.1  
> 文档版本: 0.1.1  

## 安装插件

本插件尚处于早期开发阶段，正在申请上架社区插件市场，官方下载暂不可用。您可以考虑使用手动下载，或通过 BRAT 插件下载。

### 手动下载

在[最新发布](https://github.com/Acylation/obsidian-click-clack/releases/latest)页面中，找到并下载 `main.js` 和 `manifest.json` 两个文件，并将它们放在 `[您的仓库]/.obsidian/plugins/click-clack` 路径下。

插件本体带有一个默认音效。在插件设置页面中，您还可以通过点击`下载`按钮获取更多音效。若自动下载遇到困难，如网络环境不佳等情况，请您到[最新发布](https://github.com/Acylation/obsidian-click-clack/releases/latest)页面中手动下载 `resources.zip` 并将其解压，获得 `[yourvault]/.obsidian/plugins/click-clack/resources` 这一文件夹。

### 通过 BRAT 插件下载

您可以在 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件的设置页中，添加本仓库的地址，以下载本插件并获取持续更新。

## 插件设置

在本插件的设置页，您可以调节按键音量大小、临时开启/关闭按键音，以及选择您最喜欢的音效。

您也可以使用命令面板（`Ctrl` + `P`）临时开启/关闭按键音。

## 致谢

本项目依据社区讨论 <https://forum.obsidian.md/t/typewriter-sounds/15474>，其中包含了许多宝贵的设计建议。

本项目采用的首批音效直接取自 [Writemonkey 3](https://writemonkey.com/wm3/index.php) 的 Click Clack 插件，特此致谢！

## 开发计划

- 设置页面
  - 自定义音源/音效
    - 录音采集编辑工具
    - 键盘映射 UI
  - 兼容音源
    - Mechvibes
    - Monkey type
- 处理控制字符
- 处理非编辑器区域
  - Canvas 嵌入节点区域
