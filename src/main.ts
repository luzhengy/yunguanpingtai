import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css'
// json数据展示插件样式
import 'vue-json-pretty/lib/styles.css';
// 引入字体图标库
import './assets/icon/iconfont.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
app.use(router)
 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')