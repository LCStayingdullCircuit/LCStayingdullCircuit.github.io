# Blog Improvement Roadmap

这个清单用来慢慢整理博客改造想法。先只记录需求和待确认问题，不急着实现。

## Backlog

### 1. 可以和 Obsidian 联动

目标：尽量让博客写作流程和 Obsidian 笔记库打通，减少重复维护。

待确认：

- Obsidian 笔记库现在放在哪里？
- 博客文章是否直接从 Obsidian 的某个文件夹同步？
- 是否需要支持 Obsidian 的双链语法，例如 `[[笔记标题]]`？
- 是否需要支持图片附件自动复制到博客资源目录？
- 是否需要支持标签、日期、摘要等 frontmatter？
- 发布流程希望是手动触发，还是保存后自动生成？

可能方案：

- 方案 A：博客仓库里新建 `content/`，直接把 Obsidian 文章复制进来，再用脚本生成网页。
- 方案 B：博客读取外部 Obsidian vault 的指定目录，只发布标记为 `publish: true` 的笔记。
- 方案 C：继续用 Obsidian 写 Markdown，再用 GitHub Actions 自动构建博客。

状态：待细化

## Ideas

- 

## Decisions

- 

