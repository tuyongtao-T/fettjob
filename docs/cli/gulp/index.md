<!--
 * @Author: tuyongtao1
 * @Date: 2023-07-10 09:45:14
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2023-07-10 11:00:11
 * @Description: 
-->
# gulp

## 一、 使用gulp构建文案书写工作流

### 1. 快速入门
#### 安装 gulp 命令行工具
```bash
npm install --global gulp-cli
```
gulp-cli是gulp的命令行工具，它需要全局安装，以便gulp能够在命令提示符中直接运行。gulp-cli是本地 gulp的全局的入口，负责把所有参数转发到本地gulp，还有显示项目里安装的本地gulp的版本。

全局gulp用于启动各个项目中的本地gulp，换句话说，如果在全局安装了gulp-cli，那么就可以在不同的项目 中使用不同的gulp版本。
#### 安装 gulp，作为开发时依赖项
```bash
yarn add gulp --dev
```
#### 创建 gulpfile 文件
在项目目录下创建一个名为 gulpfile.js 的文件

### 2. gulp基本API
#### 概念
##### Vinyl
Vinyl 是描述文件的元数据对象。Vinyl 实例的主要属性是文件系统中文件核心的 path 和 contents 核心方面。Vinyl 对象可用于描述来自多个源的文件（本地文件系统或任何远程存储选项上）
Vinyl 适配器
Vinyl 提供了一种描述文件的方法，但是需要一种访问这些文件的方法。使用 Vinyl 适配器访问每个文件源。

##### 适配器暴露了：
一个签名为 src(globs, [options]) 的方法，返回一个生成 Vinyl 对象的流。
一个带有签名为 dest(folder, [options]) 的方法，返回一个使用 Vinyl 对象的流。
任何特定于其输入/输出媒体的额外方法-例如 symlink 方法 vinyl-fs 所提供的。它们应该总是返回产生和/或消耗 Vinyl 对象的流。

##### 任务（Tasks）
每个 gulp 任务都是一个异步 JavaScript 函数，它要么接受一个错误优先回调，要么返回一个流、promise、事件发射器、子进程或observable。由于一些平台限制，不支持同步任务。

##### Globs
glob 是一串文字和/或通配符，如 *, **, 或 !，用于匹配文件路径。Globbing 是使用一个或多个 globs 在文件系统上定位文件的操作。