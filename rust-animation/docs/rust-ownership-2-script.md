# Rust 引用：共享读取与独占修改

建议时长：约 90～100 秒  
画面比例：1080 × 1920（竖屏）

---

## 镜头 1：引用是什么

**时间：0—16 秒**

### 旁白

> 在 Rust 中，我们可以通过引用使用一个值，而不拿走它的所有权。
>
> 引用分为两种：不可变引用和可变引用。
>
> `&value` 是不可变引用。你可以通过它读取数据，但不能修改数据。
>
> `&mut value` 是可变引用。你不仅可以读取，还可以通过它修改原来的数据。
>
> 简单来说：不可变引用是一位读者，可变引用则是一位编辑者。

### 代码

```rust
let mut text = String::from("hello");

let reader = &text;
println!("{}", reader);

let editor = &mut text;
editor.push_str(" rust");
```

### 画面

- 标题：“引用不会取得所有权”
- `text` 显示为一个数据 Box，内容为 `hello`
- `reader` 通过虚线箭头指向 `text`
- 高亮 `println!`，旁边出现“只读”
- `reader` 及其箭头淡出
- `editor` 通过红色实线箭头指向 `text`
- 执行 `push_str` 后，数据内容变为 `hello rust`
- 旁边依次出现标签：
  - `&T → 读取`
  - `&mut T → 读取 + 修改`

### 关键时间节点

- `scene1_reference_intro`
- `scene1_immutable_reference`
- `scene1_mutable_reference`
- `scene1_reader_editor`
- `scene1_end`

---

## 镜头 2：为什么两种引用不能同时存在

**时间：16—34 秒**

### 旁白

> 但 Rust 不允许一个有效的不可变引用，和一个指向同一数据的可变引用同时存在。
>
> 原因并不是 Rust 故意限制我们，而是“读取”和“修改”对数据有不同的承诺。
>
> 当不可变引用仍然有效时，Rust 保证它看到的数据不会突然发生变化。
>
> 如果这时允许可变引用修改数据，读者前一秒看到的还是 `版本 A`，下一秒就可能变成 `版本 B`。
>
> 为了让读取结果始终可靠，Rust 会在编译阶段阻止这类冲突。

### 代码

```rust
let mut document = String::from("版本 A");

let reader = &document;
let editor = &mut document; // Error

println!("{}", reader);
```

### 画面

- `document` 指向“版本 A”
- `reader` 通过虚线箭头指向“版本 A”
- 画面上方出现承诺：“reader 有效期间，数据保持稳定”
- `editor` 尝试连接同一份数据
- 两条引用范围发生碰撞，代码框轻微震动
- `&mut document` 下方出现红色波浪线
- 弹出编译错误：

```text
cannot borrow `document` as mutable
because it is also borrowed as immutable
```

- 底部显示规则：

```text
共享读取期间，不能独占修改
```

### 关键时间节点

- `scene2_reader_created`
- `scene2_stability_promise`
- `scene2_editor_attempt`
- `scene2_borrow_conflict`
- `scene2_rule`
- `scene2_end`

---

## 镜头 3：为什么可以有多个不可变引用

**时间：34—48 秒**

### 旁白

> 不可变引用之间就没有这种冲突。
>
> 因为它们都只能读取，谁也不能修改数据。
>
> 无论有一个读者，还是三个读者，所有人看到的都是同一份稳定的数据。
>
> 多个读取者不会互相干扰，所以 Rust 允许多个不可变引用同时存在。
>
> 这就是共享读取。

### 代码

```rust
let document = String::from("hello");

let reader_1 = &document;
let reader_2 = &document;
let reader_3 = &document;

println!("{reader_1}, {reader_2}, {reader_3}");
```

### 画面

- 中央显示数据 Box：`document → "hello"`
- `reader_1`、`reader_2`、`reader_3` 依次出现
- 三条虚线箭头同时指向同一份数据
- 三位读者分别执行读取，数据内容始终不变
- 三条箭头变为绿色
- 底部显示：

```text
多个 &T = 多个读者 = 安全共享
```

### 关键时间节点

- `scene3_first_reader`
- `scene3_more_readers`
- `scene3_data_unchanged`
- `scene3_shared_reading`
- `scene3_end`

---

## 镜头 4：为什么只能有一个可变引用

**时间：48—63 秒**

### 旁白

> 可变引用遵守的是另一条规则：同一时刻，只能存在一个有效的可变引用。
>
> 因为可变引用拥有修改能力。
>
> 如果两个编辑者可以同时修改同一份数据，程序就很难确定修改顺序，也无法保证其中一个引用正在操作时，数据不会被另一个引用改变。
>
> 所以 Rust 采用独占修改：一个编辑者工作时，其他读者和编辑者都必须暂时离开。

### 代码

```rust
let mut score = 10;

let editor_1 = &mut score;
let editor_2 = &mut score; // Error

*editor_1 += 1;
```

### 画面

- `score` 数据 Box 显示 `10`
- `editor_1` 获得一把“编辑钥匙”，与 `score` 建立实线连接
- `editor_2` 尝试获得第二把钥匙
- 第二把钥匙变红并被弹回
- `editor_1` 将数值修改为 `11`
- 底部显示：

```text
一个 &mut T = 一个编辑者 = 独占修改
```

### 关键时间节点

- `scene4_first_editor`
- `scene4_second_editor`
- `scene4_exclusive_access`
- `scene4_edit_success`
- `scene4_end`

---

## 镜头 5：非词法生命周期

**时间：63—87 秒**

### 旁白

> 不过，“同时存在”并不是看两个引用变量是否写在同一个大括号里。
>
> Rust 真正关心的是：这些引用还会不会继续被使用。
>
> 看这段代码。`reader` 在第一次打印之后，就再也没有被使用。
>
> 因此，它的不可变借用会在最后一次使用之后结束。
>
> 后面创建 `editor` 时，前面的读取已经结束，两段借用范围没有重叠，所以代码可以正常编译。
>
> 这种根据引用最后一次使用的位置，而不是单纯根据代码块边界判断借用范围的机制，就叫非词法生命周期，简称 NLL。

### 代码

```rust
let mut text = String::from("hello");

let reader = &text;
println!("{}", reader); // reader 最后一次使用

let editor = &mut text;
editor.push_str(" rust");
println!("{}", editor);
```

### 画面

- 标题：“非词法生命周期 NLL”
- 高亮 `reader` 的创建位置
- 从创建位置到第一次 `println!` 绘制蓝色借用范围
- 在 `println!` 后显示节点：“最后一次使用”
- 蓝色范围在这里结束
- 随后从 `editor` 创建位置开始绘制红色借用范围
- 两段范围首尾相接，但没有重叠
- 代码右侧出现绿色 `✓`
- 对比演示：如果把下面这行加到最后：

```rust
println!("{}", reader);
```

- 蓝色范围被拉长，与红色范围重叠
- 重叠区域变红，并显示编译错误

### 关键时间节点

- `scene5_same_scope`
- `scene5_reader_last_use`
- `scene5_reader_borrow_ends`
- `scene5_editor_begins`
- `scene5_no_overlap`
- `scene5_nll`
- `scene5_overlap_example`
- `scene5_end`

---

## 镜头 6：总结

**时间：87—100 秒**

### 旁白

> 总结一下。
>
> 不可变引用只能读取，因此多个不可变引用可以共享同一份数据。
>
> 可变引用能够修改数据，因此同一时刻只能有一个有效的可变引用。
>
> 可变引用和不可变引用不能同时有效，因为共享读取和独占修改不能重叠。
>
> 而引用是否仍然有效，要看它最后一次被使用的位置。这就是非词法生命周期。
>
> 记住一句话：可以多人读，只能一人写；有人写时，其他人都不能访问。

### 画面

- 标题：“Rust 引用规则”
- 四个总结 Box 依次出现：

```text
&T：只读
```

```text
多个 &T：可以共享
```

```text
&mut T：独占修改
```

```text
是否冲突：看借用范围是否重叠
```

- 最后聚合成一句话：

```text
多人读 · 一人写 · 读写不重叠
```

### 关键时间节点

- `scene6_immutable_summary`
- `scene6_shared_summary`
- `scene6_mutable_summary`
- `scene6_lifetime_summary`
- `scene6_final_rule`
- `scene6_end`
