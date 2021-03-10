> webpack是前端打包构建的不二选择，重点在于配置和使用，原理学习优先级可降低
# webpack 5 与 4
- 差异不大
- 5 内部效率更高
![](./img/webpack/2021-03-08-18-29-55.png)

# 基本配置
### 拆分和merge(通过webpack-merge实现)
![](./img/webpack/2021-03-08-19-09-34.png)

### 启动本地服务
![](./img/webpack/2021-03-08-19-11-56.png)

### 处理es6
![](./img/webpack/2021-03-08-19-12-59.png)
![](./img/webpack/2021-03-08-19-13-38.png)

### 处理样式
- postcss-loader // 兼容css，各浏览器版本的前缀，自动加
- 需要安装
    "autoprefixer": "^9.7.3",
     "postcss-loader": "^3.0.0",
![](./img/webpack/2021-03-08-19-15-33.png)
![](./img/webpack/2021-03-08-19-17-00.png)

- 处理图片
```
 module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
        ]
    },
```
- contentHash
 ![](./img/webpack/2021-03-08-19-21-47.png)

- （模块化）
  
# 高级配置
## 多入口
```
// 1. 多入口配置
entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },

// 2. output配置
output: {
        // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },

// 3. plugin示例对应每个入口都要生成
plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
    ]
```
## 抽离css文件并压缩
> 避免使用js把css写入到html中，提高性能，代码结构更加合理
```
 // 抽离 css
 module: {
        rules: [
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离 less --> css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }]
},
plugins: [
             // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],
optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
```

## 抽离公共代码、第三方代码
> 减少代码块
build-splitChunks 
webpack.config.js: optimization:{splitChunks:{cacheGroups:{}}},plugin:[new HtmlWebpackPlugin({chunks:[]}),new HtmlWebpackPlugin({chunks:[]})]

## 异步加载js（懒加载）
> webpack 会对异步加载的js进行单独打包 
```
// 正常文件引入，改为如下代码
import('../xx.js').then(res=>{
    res就是引入的内容
})
// webpack 默认支持，不需要额外配置
```

## 处理react
```
// 1. babel官网找到react配置指南，按照要求 npm i相关依赖包
npm i -D @babel/preset-react
// 2. 配置.babelrc
{
    "presets":["@babel/preset-react"]
}
// 3. 配置webpack loader
rules:[{
    test:/\.js$/,
    loader:['babel-loader'],
    include:scrPath,
    exclude:/node_modules/
}]

```

## module chunk bundle的区别
- module：模块，各个源码文件，webpack中一切皆模块
- chunk： 多模块合并成的。如entry inport()  splitChunk
- bundle: 最终的输出文件；一般一个chunk对应一个bundle
![](./img/webpack/2021-03-09-14-19-17.png)
# webpack 性能优化：优化打包效率
> 代码位置：build-optimization
## 一、 优化打包构建速度- 开发体验和效率
1. 优化babel-loader
```
{
    test:/\.js$/,
    use:['babel-loader?cacheDirectory'], // 开启缓存，没有变化的就不会再次编译
    include: path.resolve(__dirname,'src'), // 明确范围
    // exclude: path.resolve(__dirname,'node_modules') // 排除范围，与include二选一即可
}
```

2. IgnorePlugin 避免引入无用模块
```
// demo moment库只引入中文
import moment from 'moment'
import 'moment/locale/zh-cn' // 手动引入中文语言包
moment.localse('zh-cn') // 设置语言为中文

// webpack.prod.js
plugin:{
    // 忽略moment下的 /locale 目录
    new webpack.IgnorePlugin(/\./locale/, /moment/)
}
```

3. noParse  避免重复打包
```
module.exports={
    module:{
        // min结尾的文件，大多已经编译过了
        // 如：对完整的 'react.min.js'文件就没有必要再次编译构建
        // 忽略对 'react.min.js' 文件的递归解析处理
        noParse: [/react\.min\.js$/]
    }
}

- 与IgnorePlugin①的区别：IgnorePlugin是直接不引入，代码中没有，需要的东西再单独引入，提高构建速度的同时，可以减小产出文件的体积； noParse 引入，但不进行babel等编译打包操作
```

4. happyPack
5. ParallelUglifyPlugin
6. 自动刷新
7. 热更新
8. DllPugin
## 二、 优化产出代码- 产品性能

# 优化产出代码

# 构建流程概述

# babel

# 前端代码为何要进行构建、打包？

# module chunk bundle 分别是什么意思，有何区别？

# webpack如何实现懒加载？

# webpack常见性能优化

# babel-runtime 和 babel-polyfill的区别