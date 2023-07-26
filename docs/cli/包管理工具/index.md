# npm 、yarn、pnpm

## 1. package.json
```json
// 发到 npm 必备
"name": 'note'
"version": '1.0.0',
"keywords：" 'package.json', // 帮助 用户在 npm上进行关键字搜索
"private": false, // 发到npm 需要设置为false，其他项目通常为true
"files":['docs'], // 将你的软件包作为依赖关系安装时要包含的条目
"bin": {
    'myApp': './cli.js'
}, // 利用这一功能来安装 "npm "可执行文件
// 通用
"main": 'index.js', // 程序的入口

// 
"homepage": 'https://tuyongtao.gitee.io/fettjob/', // 项目主页网址
"repository": {  // 指定代码存放位置
    "type": "git",
    "url": "https://github.com/npm/cli.git"
}
// 脚本 "属性是一个字典，包含在软件包生命周期的不同时间运行的脚本命令。键是生命周期事件，值是在该时刻运行的命令;
// 支持大量内置脚本、预设生命周期事件以及任意脚本,过运行 npm run-script <stage> 或 npm run <stage> 来执行
"script："{
    // 为 package.json 中 "脚本 "部分定义的任何脚本创建 "前置 "或 "后置 "脚本，
    // 只需创建名称匹配的另一个脚本，并在其开头添加 "前置 "或 "后置 "即可。
    'predev': 'pre',
    'dev': 'dev',
    'postdev': 'post',
    // 有一些特殊的生命周期脚本只在特定情况下发生。这些脚本会在前<事件>、后<事件>和<事件>脚本之外发生。
    // prepare、prepublish、prepublishOnly、prepack、postpack、dependencies

    // 1.在打包软件包之前运行，即在 npm 发布和 npm 打包期间运行
    // 2.在本地 npm 安装时运行，无需任何参数
    // 3.在预发布之后但仅在预发布之前运行
    // 4.注意：如果通过 git 安装的软件包包含一个准备脚本，那么在打包和安装该软件包之前，将安装其依赖项和 devDependencies，并运行准备脚本。
    // 5.从 npm@7 开始，这些脚本在后台运行。要查看输出，请使用--foreground-scripts.
    "prepare": 'husky install',
    

},
"dependencies": {
    // 如果在比较器上指定了次要版本，则允许进行补丁级修改。如果没有，则允许次要版本的更改
    // 主要版本号.次要版本号.补丁版本号 【major, minor, patch】
    // ~1.2.3: 1.2.X
    // 1.2
    "test": "~1.1.0",
    // 允许不修改 [major, minor, patch] 元组中最左边非零元素的更改。
    // 换言之，允许对 1.0.0 及以上版本进行补丁和次要更新，对 0.X >=0.1.0 版本进行补丁更新，对 0.0.X 版本不进行更新。
    "test2": "^1.1.1",
    "test3": "^0.2.3",
},
// 如果有人打算下载并在其程序中使用您的模块，那么他们可能不希望或不需要下载并构建您使用的外部测试或文档框架。
// 在这种情况下，最好将这些附加项目映射到 devDependencies 对象中。
"devDependencies": {

},
// 指定您的东西在哪个版本的节点上运行
"engines": {
    "node": ">=0.10.3 < 15",
    "npm": "~1.0.20",
},
// 用于描述安装客户端应在本地文件系统中查找的位置，以便找到需要以符号链接方式连接到顶级 node_modules 文件夹的每个工作区。
"workspaces": {

}
```

## 2. package-lock.json
如果 npm 对 node_modules 树或 package.json 进行了修改，package-lock.json 就会自动生成。它描述了生成的精确树，因此无论中间依赖关系如何更新，后续安装都能生成完全相同的树。

- 该文件用于提交到源代码库，有多种用途：
- 描述依赖关系树的单一表示形式，从而保证队友、部署和持续集成安装完全相同的依赖关系。
- 为用户 "穿越 "到 node_modules 以前的状态提供便利，而无需提交目录本身。
- 通过可读的源代码控制差异，提高树变化的可见性。
- 通过允许 npm 跳过对先前安装的软件包的重复元数据解析，优化安装过程。
- 从 npm v7 开始，lockfile 包含了足够的信息来获取软件包树的完整信息，从而减少了读取 package.json 文件的需要，并显著提高了性能。

为了避免重复处理 node_modules 文件夹，npm 从 v7 版本开始使用 node_modules/.package-lock.json 中的 "隐藏 "锁文件。该文件包含有关树的信息，在满足以下条件的情况下，可代替读取整个 node_modules 层次结构：

- 它引用的所有软件包文件夹都存在于 node_modules 层次结构中。
- node_modules 层次结构中不存在锁定文件中未列出的软件包文件夹。
- 文件的修改时间至少与其引用的所有软件包文件夹的修改时间一样新。
- 也就是说，只有在最近一次更新软件包树时创建的隐藏锁文件才是相关的。如果其他 CLI 以任何方式更改了软件包树，这将被检测到，隐藏的锁文件也将被忽略。

请注意，手动更改软件包内容时，软件包文件夹的修改时间可能不受影响。例如，如果你在 node_modules/foo/lib/bar.js 中添加了一个文件，那么 node_modules/foo 的修改时间将不会反映这一变化。如果要手动编辑 node_modules 中的文件，通常最好删除 node_modules/.package-lock.json 中的文件。

由于旧版本的 npm 会忽略隐藏锁文件，因此它不包含 "正常 "锁文件中的向后兼容性功能。也就是说，它是 lockfileVersion: 3，而不是 lockfileVersion: 2

文件格式
```json
name
此软件包锁的软件包名称。这将与 package.json 中的内容相匹配。
version
软件包的版本。与 package.json 中的内容一致。
lockfileVersion
一个整数版本，从 1 开始，表示生成此 package-lock.json 时所使用语义的此文档的版本号。
```
请注意，该文件格式在 npm v7 中发生了重大变化，以追踪原本需要在 node_modules 或 npm 注册表中查找的信息。npm v7 生成的锁定文件将包含 lockfileVersion: 2。

未提供版本：来自 npm v5 之前版本的 "古老 "收缩包文件。
- 1：npm v5 和 v6 使用的 lockfile 版本。
- 2：npm v7 和 v8 使用的 lockfile 版本。向后兼容 v1 锁定文件。
- 3：npm v9 使用的锁定文件版本，向后兼容 npm v7。
npm 始终会尝试从锁文件中获取所能获取的任何数据，即使该版本并非其设计支持的版本。

## 3. npm cli
### 1. npm adduser
在指定的注册表中创建新用户，并将凭据保存到 .npmrc 文件中。如果未指定注册表，将使用默认注册表（请参阅注册表）。使用传统 auth 类型时，用户名、密码和电子邮件将从提示中读入。
### 2. npm ci: 
该命令与 npm install 类似，但它适用于自动化环境，如测试平台、持续集成和部署，或任何需要确保对依赖项进行干净安装的情况。

使用 npm install 和 npm ci 的主要区别如下：

- 项目必须已有 package-lock.json 或 npm-shrinkwrap.json。
- 如果包锁中的依赖关系与 package.json 中的依赖关系不匹配，npm ci 会出错退出，而不会更新包锁。
- npm ci 一次只能安装整个项目：不能使用此命令添加单个依赖项。
- 如果 node_modules 已经存在，它会在 npm ci 开始安装前自动移除。
- 它永远不会写入 package.json 或任何 package-locks：安装基本上是冻结的。
- 注意：如果你在运行 npm install 时创建了 package-lock.json 文件，并使用了会影响依赖关系树形状的标志（如 --legacy-peer-deps 或 --install-links ），你必须向 npm ci 提供相同的标志，否则很可能会遇到错误。一个简单的方法是运行 npm config set legacy-peer-deps=true --location=project 并将 .npmrc 文件提交到你的 repo。
### 3. npm config
npm 从命令行、环境变量、npmrc 文件以及某些情况下的 package.json 文件中获取配置设置。npm config 命令可用于更新和编辑用户和全局 npmrc 文件的内容。
```bash
npm config set <key>=<value> [<key>=<value> ...]
npm config get [<key> [<key> ...]]
npm config delete <key> [<key> ...]
npm config list [--json]
npm config edit
npm config fix

alias: c
```
### 4. npm doctor
npm doctor 会进行一系列检查，以确保 npm 安装具备管理 JavaScript 软件包所需的条件。npm 主要是一个独立工具，但也有一些必须满足的基本要求：

Node.js 和 git 必须可由 npm 执行。
主要的 npm 注册表 registry.npmjs.com 或其他使用注册表 API 的服务可用。
npm 使用的目录 node_modules（本地和全局）存在，且当前用户可以写入。
npm 缓存存在，其中的软件包压缩包没有损坏。
如果这些都不能正常运行，npm 可能就无法正常工作。许多问题通常可归因于 npm 代码库之外的事物，因此 npm 医生会确认 npm 安装是否处于良好状态。

此外，由于使用旧版本的 npm 而导致的问题报告也非常多。由于 npm 在不断改进，运行 npm@latest 总比使用旧版本要好。

npm doctor 会验证环境中的以下项目，如果有任何建议更改，它就会显示出来。默认情况下，npm 会运行所有这些检查。您可以将它们指定为额外参数，以限制运行的检查项目。
### 5. npm install
此命令安装软件包及其依赖的任何软件包。如果软件包有 package-lock、npm shrinkwrap 文件或 yarn lock 文件，依赖包的安装将受其驱动，并遵守以下优先顺序：
- npm-shrinkwrap.json
- package-lock.json
- yarn.lock

npm install（在软件包目录下，无参数）：将依赖项安装到本地的 node_modules 文件夹中。

在全局模式下（即在命令中附加 -g 或 --global），它会将当前软件包上下文（即当前工作目录）安装为全局软件包。

默认情况下，npm install 会安装 package.json 中列为依赖项的所有模块。
### 6. npm link
这对安装你自己的东西很方便，这样你就可以对它进行工作和反复测试，而不必不断地重建。

软件包链接分为两个步骤。

首先，在不带参数的软件包文件夹中执行 npm link，会在全局文件夹 `{prefix}/lib/node_modules/<package>` 中创建一个符号链接，链接到执行 npm link 命令的软件包。它还会将软件包中的任何 bins 链接到 {prefix}/bin/{name}。请注意，npm link 使用全局前缀（其值请参阅 npm prefix -g）。

接下来，在其他位置，npm link package-name 将从全局安装的 package-name 创建一个符号链接到当前文件夹的 node_modules/。

请注意，package-name 取自 package.json，而非目录名。

软件包名称可选择以 scope 作为前缀。请参见 scope。scope 前面必须有 @ 符号，后面必须有斜线。

在为 npm publish 创建压缩包时，链接的软件包会通过解析符号链接（如果它们包含在 bundleDependencies 中）"快照 "到其当前状态。
### 7. npm update
该命令将把列出的所有软件包更新到最新版本（由标签 config 指定），同时尊重软件包及其依赖包（如果它们也需要相同的软件包）的 semver 约束。

它还会安装丢失的软件包。

如果指定了 -g 标志，该命令将更新全局安装的软件包。

如果没有指定软件包名称，则会更新指定位置（全局或本地）的所有软件包。

请注意，默认情况下，npm update 不会更新项目 package.json 中直接依赖包的 semver 值，如果你也想更新 package.json 中的值，可以运行：npm update --save（或在配置文件中添加 save=true 选项，使其成为默认行为）。
### 8.npm view
该命令显示软件包的相关数据并打印到 stdout。
### 9.npm whoiami
显示当前登录用户的 npm 用户名。

如果登录的注册表提供基于令牌的身份验证，则连接到 /-/whoami 注册表端点，查找与令牌关联的用户名，并打印到标准输出。

如果登录的注册表使用基本认证，则只需打印认证字符串中的用户名部分。
### 10. npx
该命令允许你从 npm 软件包（可以是本地安装的软件包，也可以是远程获取的软件包）中运行任意命令，与通过 npm run 运行命令的上下文类似。

无论 --package 选项指定了什么软件包，执行命令的 PATH 中都会提供这些软件包，以及任何本地安装的软件包可执行文件。可以多次指定 --package 选项，以便在所有指定软件包都可用的环境中执行所提供的命令。

如果本地项目依赖关系中不存在任何请求的软件包，则会将其安装到 npm 缓存中的文件夹，并添加到执行进程的 PATH 环境变量中。系统会打印提示（可以通过提供 --yes 或 --no 来抑制该提示）。

所提供的软件包名称如果不带说明符，将与本地项目中存在的任何版本相匹配。带指定符的软件包名称只有在其名称和版本与本地依赖项完全相同时才会被视为匹配。

如果未提供 -c 或 --call 选项，则使用位置参数生成命令字符串。如果没有提供--package选项，npm会根据以下启发式方法，尝试从作为第一个位置参数提供的软件包指定符中确定可执行文件的名称：

如果软件包在 package.json 的 bin 字段中只有一个条目，或者所有条目都是同一命令的别名，那么将使用该命令。
如果软件包有多个 bin 条目，且其中一个与名称字段的非选区部分匹配，则将使用该命令。
如果这样做的结果不是只有一个选项（要么是因为没有 bin 条目，要么是因为没有一个与软件包名称相匹配的条目），那么 npm exec 会出错退出。
要运行指定二进制文件以外的二进制文件，请指定一个或多个 --package 选项，这样 npm 就不会从第一个命令参数中推断出软件包。

## 4. yarn

初始化一个新项目
```bash
yarn init
```
添加依赖包
```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```
将依赖项添加到不同依赖项类别中

分别添加到 devDependencies、peerDependencies 和 optionalDependencies 类别中：
```bash
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```
升级依赖包
```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```
移除依赖包
```
yarn remove [package]
```
安装项目的全部依赖
```bash
yarn
或者
yarn install
```

## 5. pnpm 

当使用 npm 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 100 份该相同依赖包的副本。然而，如果是使用 pnpm，依赖包将被 存放在一个统一的位置，因此：

如果你对同一依赖包需要使用不同的版本，则仅有 版本之间不同的文件会被存储起来。例如，如果某个依赖包包含 100 个文件，其发布了一个新 版本，并且新版本中只有一个文件有修改，则 pnpm update 只需要添加一个 新文件到存储中，而不会因为一个文件的修改而保存依赖包的 所有文件。
所有文件都保存在硬盘上的统一的位置。当安装软件包时， 其包含的所有文件都会硬链接自此位置，而不会占用 额外的硬盘空间。这让你可以在项目之间方便地共享相同版本的 依赖包。
最终结果就是以项目和依赖包的比例来看，你节省了大量的硬盘空间， 并且安装速度也大大提高了！
### 1.创建非扁平化节点模块目录
当使用 npm 或 Yarn Classic 安装依赖包时，所有软件包都将被提升到 node_modules 的 根目录下。其结果是，源码可以访问 本不属于当前项目所设定的依赖包。
### 2.兼容性
以下列表列出了以往的 pnpm 版本和对应支持的 Node.js 版本。

| Node.js |	pnpm 5 | pnpm 6 | pnpm 7 | pnpm 8
| ---- |---- |---- |---- |---- |
|Node.js 12|	✔️	|✔️	|❌|	❌|
|Node.js 14|	✔️	|✔️	|✔️|	❌|
|Node.js 16|	?️	|✔️	|✔️|	✔️|
|Node.js 18|	?️	|✔️	|✔️|	✔️|

## 6. 三者之间的差异
 - [1. 为什么用pnpm](https://www.51cto.com/article/702067.html)
 - [2. 为什么用pnpm](https://zhuanlan.zhihu.com/p/352437367)
 - [3. 为什么用pnpm](https://juejin.cn/post/7047556067877716004)
 - [4. 为什么用pnpm](https://www.pnpm.cn/blog/2020/05/27/flat-node-modules-is-not-the-only-way)

 ## 7. 工具库 ni
 
 use the right package manager
 ### 安装

 ```bash
npm i -g @antfu/ni
 ```
 ### 使用
 ```bash
ni
# npm install
# yarn install
# pnpm install
# bun install

ni vite
# npm i vite
# yarn add vite
# pnpm add vite
# bun add vite

ni @types/node -D
# npm i @types/node -D
# yarn add @types/node -D
# pnpm add -D @types/node
# bun add -d @types/node

nr dev --port=3000
# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev --port=3000
# bun run dev --port=3000

nlx vitest
# npx vitest
# yarn dlx vitest
# pnpm dlx vitest
# bunx vitest

nu
# (not available for bun)
# npm upgrade
# yarn upgrade (Yarn 1)
# yarn up (Yarn Berry)
# pnpm update

nun webpack
# npm uninstall webpack
# yarn remove webpack
# pnpm remove webpack
# bun remove webpack
 ```

