# Flexbox（弹性盒子）

## 引言

Flexbox（Flexible Box）是CSS3引入的一种新的布局模型，旨在提供更为高效和预测性的方式来布局、对齐和分配空间。与传统的布局模型（如浮动和定位）相比，Flexbox更加灵活和强大。

## 基础概念

### 弹性容器（Flex Container）

任何使用 `display: flex` 或 `display: inline-flex` 的元素都会变成弹性容器。

### 弹性项目（Flex Items）

弹性容器内的所有子元素自动成为弹性项目。

## 容器属性

### `display`

这是启用Flexbox的第一步。你可以选择 `flex`（块级）或 `inline-flex`（行内）。

```css
.container {
  display: flex; /* 或 inline-flex */
}
```

### `flex-direction`

这个属性定义了主轴的方向。

- `row`（默认）：水平方向，从左到右。
- `row-reverse`：水平方向，从右到左。
- `column`：垂直方向，从上到下。
- `column-reverse`：垂直方向，从下到上。

```css
.container {
  flex-direction: row; /* 默认值 */
}
```

### `flex-wrap`

控制弹性项目是否应在多行上显示。

- `nowrap`（默认）：所有项目都在一行上。
- `wrap`：项目会换行。
- `wrap-reverse`：项目会反向换行。

```css
.container {
  flex-wrap: nowrap; /* 默认值 */
}
```

### `flex-flow`

这是 `flex-direction` 和 `flex-wrap` 的简写属性。

```css
.container {
  flex-flow: row nowrap; /* 默认值 */
}
```

### `justify-content`

定义了项目在主轴上的对齐方式。

- `flex-start`（默认）：左对齐。
- `flex-end`：右对齐。
- `center`：居中。
- `space-between`：两端对齐。
- `space-around`：平均分布。

```css
.container {
  justify-content: flex-start; /* 默认值 */
}
```

### `align-items`

定义项目在交叉轴上如何对齐。

- `stretch`（默认）：拉伸填充容器。
- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：居中。
- `baseline`：项目的第一行文字的基线对齐。

```css
.container {
  align-items: stretch; /* 默认值 */
}
```

### `align-content`

多行弹性容器在交叉轴上的对齐方式。

- `stretch`（默认）：拉伸以占据整个交叉轴。
- `flex-start`：堆叠在交叉轴的起点。
- `flex-end`：堆叠在交叉轴的终点。
- `center`：堆叠在交叉轴的中点。
- `space-between`：两端对齐。
- `space-around`：平均分布。

```css
.container {
  align-content: stretch; /* 默认值 */
}
```

## 项目属性

### `order`

定义项目的排列顺序。数值越小，排列越靠前。

```css
.item {
  order: 0; /* 默认值 */
}
```

### `flex-grow`

定义项目的放大比例。

```css
.item {
  flex-grow: 0; /* 默认值 */
}
```

### `flex-shrink`

定义了项目的缩小比例。

```css
.item {
  flex-shrink: 1; /* 默认值 */
}
```

### `flex-basis`

定义了在分配多余空间之前，项目占据的主轴空间。

```css
.item {
  flex-basis: auto; /* 默认值 */
}
```

### `flex`

这是 `flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。

```css
.item {
  flex: 0 1 auto; /* 默认值 */
}
```

### `align-self`

允许单个项目有与其他项目不一样的对齐方式，覆盖 `align-items` 属性。

- `auto`：按照 `align-items` 属性进行对齐。
- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：居中。
- `baseline`：项目的第一行文字的基线对齐。
- `stretch`：拉伸以填充容器。

```css
.item {
  align-self: auto; /* 默认值 */
}
```