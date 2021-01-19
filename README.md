# my-cli
基于webpack5脚手架工具，可以以此为基础，再去搭建Vue或者React环境。

有几个值得注意的配置：

1. `babel 7.4`以上该怎样配置
2. `optimization.splitChunks`如何做代码分割
3. `eslint + prettier + airbnb-base`怎样配置

## 1. `babel 7.4`以上的配置

1. 先安装下面这些包

> npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime

> npm install -S core-js

2. webpack.config.js中添加一条规则

```javascript
rules: [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: 'babel-loader',
  },
],
```

3. 在`.babelrc`文件中添加以下配置

```javascript
{
  "presets": [
    [
      "@babel/preset-env", 
      {
        "useBuiltIns": "entry",
        "corejs": 3,
        "modules": false
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        "corejs": false,
        "regenerator": true
      }
    ]
  ]
}
```

4. 在入口文件顶部导入这个包

```javascript
import 'core-js'
```

以上，所做的工作主要包括：`@babel/preset-env`处理语法、`core-js`兼容API、`@babel/plugin-transform-runtime`从@babel/runtime中导入helper来减少重复以及Generator/async的处理

如果有疑问可以参考：[#issuecomment-619587386](https://github.com/babel/babel/issues/9853#issuecomment-619587386)

## 2. `optimization.splitChunks`如何做代码分割

在webpack.config.js添加如下配置：
```javascript
optimization: {
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      vendors: {
        chunks: 'initial',
        minChunks: 2,
        priority: -10,
        test: /[\\/]node_modules[\\/]/,
        reuseExistingChunk: true,
        name: 'vendors',
      },
      common: {
        chunks: 'initial',
        minChunks: 2,
        priority: -20,
        test: /[\\/]src[\\/]/,
        reuseExistingChunk: true,
        name: 'common',
      },
    },
  },
},
```
我们看关键的两个缓存组配置：

1. vendors表示从node_modules导入的包，并且导入次数超过一次会优先打包到vendors文件中，priority大的具有优先权
2. common表示src中导入的包，并且导入次数超过一次会打包到common文件中

没有被缓存组命中的包，最终会进入自身的文件中。

## 3. `eslint + prettier + airbnb-base`怎样配置

先安装下面这些包：

> npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier

然后`npx eslint --init`初始化`.eslintrc.json`文件，并添加以下配置：

```
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  },
}
```

然后创建`.prettierrc`文件并添加如下配置：

```
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 70,
}
```
最后，执行以下命令：

> npx install-peerdeps --dev eslint-config-airbnb-base

并修改`.eslintrc.json`文件：
```
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}
```

以上，vscode应该安装eslint和prettier来配合使用
