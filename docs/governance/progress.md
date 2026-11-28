# 架构降熵治理 · 进度文件（020_veryfunstudio.github.io）

> 精简版治理（小仓库）：扫描 → 熵清单 → 迁移删除 → 验证 → 防回归。
> worktree 分支 `governance/arch-20261128`；每轮 `pnpm run check`（lint→tsc→test→build）全绿方可提交；
> UI 轮次追加 `pnpm run test:e2e:built`。

## 基线（2026-11-28，main@eaaf847）

- check 全绿（worktree 复验同绿）；node:test 单测 + Playwright e2e 为行为基线。
- 结构：React Router v7 框架模式（app/ + src/pages），framer-motion 动效，
  studio-relaunch.css（BEM，含动态修饰符）+ index.css（Tailwind v4 入口）双层。

## 熵清单（2026-11-28）

- **E1 双图标库单点**：`lucide`（裸包）+ `morphicons` 仅 Header 汉堡按钮一处使用
  （与 011_Cambridge 同源模式）；其余 10+ 文件统一 lucide-react。
- **E2 死导出 `REVEAL_FADE`**：为 tactile-card 预建的淡入变体，从未被任何消费方导入
  （注释里的使用场景没有落地）。
- **E3 过度导出 `ORGANIZATION_SAME_AS`**：仅 schema.ts 内部使用（63/73 两处）。
- **E4 无 CSS 孤儿防回归**：studio-relaunch.css 155 类中存在动态 BEM 修饰符
  （`stage--${TONES[...]}`、`game-row--${index%3}`），静态孤儿扫描必须区分
  「动态生成」与「真死」，否则守卫误报会摧毁可信度。

## 勘察排除项（健康结构，未动）

- index.css 零孤儿；gh-pages/tsx/isbot/framer-motion 均有真实使用
  （deploy 脚本 / node --import tsx / entry.server / 动效组件）；
  BrandIcons 内联 SVG 有明释注释（lucide-react 有意不含品牌 logo）。

## 终态（2026-11-28，治理收敛）

- 测试：node:test 44 pass（基线 43 + 1 CSS 守卫契约）；check 全绿；e2e:built 全量绿。
- 分支 governance/arch-20261128 共 3 个 commit（R0-R2）。
- 收口：图标库归一 lucide-react（依赖 -2）、REVEAL_FADE 死导出删除、ORGANIZATION_SAME_AS 去 export、
  CSS 孤儿守卫上线（BEM 动态修饰符以「基名--${」模板模式判定为生成态，固化首轮误报教训）。
- 勘察排除项维持：index.css 零孤儿，gh-pages/tsx/isbot/framer-motion 均有真实使用。

## 轮次记录

| 轮 | 内容 | Commit |
| --- | --- | --- |
| R2 | CSS 孤儿守卫：src/css.test.ts（node:test，词边界 + BEM 动态修饰符判定——
  首轮静态扫描曾把 5 个模板生成的修饰符误报为孤儿，测试把区分规则固化防误报）；
  独立复审全量 diff；终态回填 | (本 commit) |
| R1 | 图标库归一 lucide-react：Header 汉堡 Menu↔X 改旋转+淡入过渡（同 011_Cambridge 收口模式），删除 lucide（裸包）+ morphicons 依赖；REVEAL_FADE 死导出删除（为 tactile-card 预建从未被采用）；ORGANIZATION_SAME_AS 去 export（仅内部使用）；依赖 -2 | 489e1f9 |
