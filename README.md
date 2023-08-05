# verification

vite+ts+vue 结合 eslint、prettier、husky、lint-staged、commitlint 搭建开发环境

## 创建项目

yarn create vite houdunren --template vue-ts

VsCode安装`Eslin`插件和`Prettier - Code formatter`插件

## 添加prettier

安装：yarn add prettier -d -exact

配置.prettierrc文件

```js
// Prettier 配置说明
// 请根据项目的需求和团队的约定进行配置
{
  "arrowParens": "always", // 箭头函数参数周围始终使用括号
  "bracketSameLine": true, // 对象的花括号与属性在同一行
  "bracketSpacing": true, // 对象字面量中的花括号添加空格
  "embeddedLanguageFormatting": "auto", // 自动格式化内嵌语言（如 HTML、JSX、CSS 等）
  "htmlWhitespaceSensitivity": "css", // 按照 CSS 的规则处理 HTML 文件中的空格
  "insertPragma": false, // 不在文件顶部插入特殊的注释，指示文件已经使用 Prettier 格式化
  "jsxSingleQuote": false, // JSX 中的属性不使用单引号，而使用双引号
  "printWidth": 120, // 每行代码的最大长度为 120
  "proseWrap": "never", // 不对 Markdown 文件进行换行处理
  "quoteProps": "as-needed", // 对象属性根据需要添加引号
  "requirePragma": false, // 不要求文件顶部有特殊的注释，指示文件已经使用 Prettier 格式化
  "semi": false, // 不在语句末尾添加分号
  "singleQuote": true, // 使用单引号
  "tabWidth": 2, // 每个缩进级别为 2 个空格
  "trailingComma": "all", // 对象、数组等结尾始终添加尾随逗号
  "useTabs": false, // 使用空格进行缩进，而不是制表符
  "vueIndentScriptAndStyle": false, // Vue 单文件组件中的 <script> 和 <style> 标签不单独缩进
  "singleAttributePerLine": false // 在多行属性中不将每个属性都单独一行
}
```

Json文件

```json
{
  "arrowParens": "always",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 120,
  "proseWrap": "never",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "singleAttributePerLine": false
}
```

## 添加eslint

安装：yarn add eslint -d -exact

初始化eslint配置：npx eslint --init

```text
//为了能让eslint文件能够识别和解析`ts`文件和`vue`文件
How would you like to use ESLint?
To check syntax, find problems, and enforce code style
What type of modules does your project use?
JavaScript modules (import/export)
Which framework does your project use?
Vue.js
Does your project use TypeScript?
YES
Where does your code run?
Browser、Node都选上
How would you like to define a style for your project?
Answer questions about your style
What format do you want your config file to be in?
JSON
What style of indentation do you use?
Tabs
What quotes do you use for strings?
double
What line endings do you use?
Windows
Do you require semicolons?
-    No
Would you like to install them now?
YES
Which package manager do you want to use? .
-    yarn
```

解决部分ESLint和Prettier冲突

yarn add --dev --exact eslint-config-prettier

```json
//如果你用的是ESLint，需要安装ESLint -config-Prettier，让ESLint和Prettier和睦相处。它关闭所有不必要的或可能与Prettier冲突的ESLint规则
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "prettier" //这是新加的一定要在最后
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "vue"],
  "rules": {
    "array-callback-return": "error"
  }
}
```

package.json新增以下脚本：

```
 "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "eslint": "eslint \"src/**/*.{ts,js,vue}\" \"src/main.ts\""
  },
```

## 添加husky

安装：yarn add husky -d -exact

添加一个script脚本到package.json：npm pkg set scripts.husky="husky install"

生成.husky文件：npm run husky

配置husky

```js
  npx husky add .husky/pre-commit
  npx husky add .husky/commit-msg
```

.husky/pre-commit文件配置如下：

```js
js复制代码#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run eslint//git commit之前，会执行这个脚本，错误则不会暂存，成功则会暂存
```

使用husky的`commit-msg`钩子：

`git commit -m <type>[optional scope]: <description>` // **注意冒号后面有空格**

- type：提交的类型（如新增、修改、更新等）
- optional scope：涉及的模块，可选
- description：任务描述

示例：feat: 新增了一个搜索功能在首页。

这样规范后，我们就可以很清晰看到本次提交是做了哪些修改，方便后期的查阅和维护。

## 添加校验工具`commitlint`

安装：yarn add @commitlint/cli @commitlint/config-conventional -d -exact

新建`.commitlintrc.json`文件

配置，其实就这样就可以了，然后可以根据需要，更改一些默认配置，以下为示例:

```js
{
  "extends": ["@commitlint/config-conventional"],
  //提交类型，不满足直接回抛错
  "type-enum": [
    2,
    "always",
    ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"]
  ],
}
```

修改`./husky/commit-msg`钩子文件：

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
# 新增
npx --no -- commitlint --edit ${1}
```

测试

更改文件，然后信息输入为`修改配置文件`,会发现提交失败：

修改提交信息为：`feat: 修改配置文件`，成功了！！，**记住feat冒号后面一定要有一个空格**，这算是一个坑吧。

## 添加lint-staged

安装`lint-staged`：yarn add lint-staged -d -exact

### 添加`lint-staged`配置到`package.json`中

```json
"lint-staged": {
  //本地暂存库需要commit的文件才会执行以下对应脚本,eslint和prettier需要的路径会后面自动追加检测
    "*.{ts,js,jsx,vue}": [
      "eslint",
      "prettier --write"
    ]
  }
```
