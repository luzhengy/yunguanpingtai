import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
export default defineConfig({
  css:{
    preprocessorOptions: {
      scss: {
        /**
         * - 引入 common.scss (已经包括了 variables.scss及mixins.scss)
        */
        additionalData: `@import "./src/assets/style/common.scss";`
      }
    }
  },
  plugins: [vue({reactivityTransform: true}),
    AutoImport({
      resolvers: [ElementPlusResolver(),// ElementPlus组件自动导入
        ],
      imports: ['vue']// API（ref，computed，watch） 自动导入
  }),
  Components({
    resolvers: [
      // 自动注册图标组件
      IconsResolver(),
        // 自动注册Element组件
      ElementPlusResolver()],
  }),
  Icons(),
],
  
 resolve: {
  alias: {
    // '@':'绝对路径', 若有需要，自行配置其他
    '@': path.join(__dirname, 'src')
  }
}
})
