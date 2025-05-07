import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            // 指定库的入口文件
            entry: resolve(__dirname, 'src/index.js'),
            // 库名称（全局变量名）
            name: 'WingsFill',
            // 输出文件名
            fileName: (format) => format === 'es' ? 'wings-fill.mjs' : 'wings-fill.js',
            // 输出格式（ES 模块和 UMD 格式）
            formats: ['es', 'umd']
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [],
            output: {
                // 为 UMD 构建提供全局变量
                globals: {
                    // 如果有外部依赖，这里需要配置全局变量名
                    // 例如 'lodash': '_'
                }
            }
        }
    }
})