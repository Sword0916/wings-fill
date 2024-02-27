const path = require('path');

module.exports = {
    entry: './src/index.js',
    // devtool: 'inline-source-map',
    // devServer: {
    //     static: './',
    // },
    mode: "production", // 告诉webpack使用production模式的内置优化,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'wings-fill.js', //打包之后生成的文件名，可以随意写。
        library: 'WingsFill', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
        libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
        // globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
        libraryTarget: 'umd', // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
        // publicPath: '../dist/',//在url地址前加上
        clean: true
    },
}