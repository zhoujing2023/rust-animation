# Components 组件说明

该目录存放项目中可复用的 Motion Canvas 组件。大多数组件都支持通过
`ref` 获取内部节点，并在场景生成器中使用 `yield*` 播放动画。

## 代码展示

### `CodeLayout`

带窗口控制点、文件名和 Rust 语法高亮的代码布局。

- `code`：显示的代码内容。
- `codeRef`：获取内部 `Code` 节点。
- `filename`：文件名，默认为 `main.rs`。
- `selection`：需要高亮的代码区域。

### `CodeRect`

在面板样式的 `Rect` 中封装 `CodeLayout`，适合直接作为场景中的代码卡片。
可以配置面板尺寸、位置和透明度，并分别通过 `rectRef`、`codeRef` 控制面板
和代码。

## 数据卡片

### `DataRect1`

三行文字的数据卡片，常用于展示类型、数据内容和补充说明。
`label1`、`label2`、`label3` 的格式均为：

```ts
[文字内容, 字号, 颜色]
```

同时支持配置尺寸、位置、背景、边框、圆角、阴影和透明度。

### `DataRect2`

单行标签的数据卡片，并预置了失效提示文字。可使用：

- `contentRectRef`：控制内容卡片，例如降低透明度。
- `invalidTxtRef`：控制失效文字的透明度和缩放。
- `invalidShowTxt`：设置失效提示内容。

失效动画示例：

```ts
invalidTxtRef().scale(0);

yield* all(
  contentRectRef().opacity(0.3, 0.3),
  invalidTxtRef().opacity(1, 0.3),
  invalidTxtRef().scale(1, 0.5, easeOutBack),
);
```

## 图形和角色

### `DefaultPictogramLayout`

默认人形图标，包含主标题和副标题。传入的 `size` 是
`SimpleSignal<number>`，修改该 signal 可以动态缩放整个图形。

### `DoubtPictogramLayout`

带问号和疑惑表情的人形图标，支持设置位置、颜色和透明度。

### `VehicleLayout`

自行车图标，包含两行说明文字。与默认人形组件一样，通过 `size` signal
响应式控制整体大小。

### `KeyLayout`

钥匙图标及其文字标签，通过 `size` signal 控制整体大小。

### `FerrisImg`

Rust 吉祥物 Ferris 图片组件，支持设置位置、缩放和透明度。获取图片 ref 后，
可以组合位移和旋转制作动作动画。

## 状态提示

### `ErrorLayout`

红色圆形错误标识，中央显示 `X`。支持调整尺寸、字号、透明度和缩放。

### `SuccessLayout`

绿色圆形成功标识，中央显示 `✓`。参数结构与 `ErrorLayout` 基本一致。

### `ForbiddenLayout`

禁止使用标志，包含禁止符号和提示文字。初始 `scale` 为 `0`，可通过 ref
播放弹出动画。

### `ErrorMsgRect`

编译错误信息卡片，由错误标题和错误内容组成。`errContent` 为必填项，
`errMsg` 默认为 `COMPILER ERROR`。

### `UnderlineLine`

红色波浪下划线，用于标记错误代码。`length` 控制折线点数量；组件初始
透明度和绘制进度均为 `0`，可通过 ref 执行出现及绘制动画。

## 连线

### `SolidLine`

带箭头的实线连接线。`points` 定义路径，`end` 控制绘制进度，适合使用
`lineRef().end(1, duration)` 播放连线动画。

### `DottedLine`

带箭头的虚线连接线。除了实线组件的常用参数外，还可通过 `lineDash`
调整虚线间隔。

## 标题

### `TitleLayout`

居中排列的标题和可选副标题。参数格式如下：

```ts
title: [文字内容, 字号, 颜色, 字重]
subtitle: [文字内容, 字号, 颜色]
```

