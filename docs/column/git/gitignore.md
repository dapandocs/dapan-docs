# .gitignore 用法详解

.gitignore 文件是一个特殊的文件，用于告诉 Git 版本控制系统忽略某些文件或文件夹。也就是说，当你提交代码时，列在 .gitignore 文件中的文件或文件夹将不会被包括在提交中。

## `.gitignore` 文件的基本语法

1. **注释**：以 `#` 开头的行是注释，将被 Git 忽略。

   ```
   # 这是一个注释
   ```

2. **空白行**：空白行不匹配任何文件，所以可以用来分隔规则。

   ```

   ```

3. **忽略特定文件**：直接写文件名。例如 secret.txt，这会忽略所有名为 secret.txt 的文件，无论它们在仓库的哪个位置。

   ```
   secret.txt
   ```

4. **忽略特定扩展名**：使用通配符 `*`。例如 \*.log，这会忽略所有扩展名为 .log 的文件，无论它们在仓库的哪个位置。

   ```
   *.log
   ```

5. **忽略特定文件夹**：在文件夹名后加 `/`。例如 temp/，这会忽略所有名为 temp 的文件夹及其内容，无论它们在仓库的哪个位置。

   ```
   temp/
   ```

6. **忽略特定文件夹下的特定文件**：可以组合使用。例如 temp/\*.txt，这个规则稍微特殊一些。它会忽略所有名为 temp 的文件夹下的 .txt 文件。但请注意，这个规则只会匹配名为 temp 的文件夹，而不是所有文件夹。

```
temp/*.txt
```

如果你想忽略所有文件夹下的 .txt 文件，你可以使用 _.txt 规则。如果你想忽略所有名为 temp 的文件夹下的 .txt 文件，无论这些文件夹在仓库的哪个位置，你需要使用 \*\*/temp/_.txt 规则。

7. **不忽略特定文件**：即使文件被前面的规则忽略，也可以使用 `!` 来重新包括文件。
   ```
   !important.log
   ```

## 特殊情况和技巧

- **全局 `.gitignore` 文件**：你可以创建一个全局的 `.gitignore` 文件，适用于你的所有 Git 仓库。只需运行以下命令：

  ```
  git config --global core.excludesfile ~/.gitignore_global
  ```

- **忽略已追踪的文件**：如果文件已经被追踪，你需要先运行 `git rm --cached <file>` 来取消追踪，然后再添加到 `.gitignore` 文件。

- **调试 `.gitignore` 文件**：如果你不确定为什么某个文件被忽略，可以使用 `git check-ignore` 命令来调试。
  ```
  git check-ignore -v somefile.txt
  ```

## 模板

### UmiJS

```
# 编译输出
/dist
/.umi
/src/.umi-production
/src/.umi-test

# 依赖文件夹
/node_modules

# 环境配置
/.env
/.env.local

# 编辑器和操作系统文件
/.vscode
.DS_Store
Thumbs.db

# 日志文件
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# 测试覆盖率
/coverage

# 临时文件
/tmp
/temp

# 其他忽略文件
.secret
```

### Vite

```
# 编译输出
/dist
/build

# 依赖文件夹
/node_modules

# 环境配置
/.env
/.env.local

# 编辑器和操作系统文件
/.vscode
.DS_Store
Thumbs.db

# 日志文件
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# 测试覆盖率
/coverage

# 临时文件
/tmp
/temp

# 其他忽略文件
.secret
```
