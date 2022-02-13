import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// md插件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 配置后端端口
let ifDEV = process.env.NODE_ENV === 'development'
const baseURL = ifDEV ? 'http://localhost:80' : ''


createApp(App).use(store).use(router).use(ElementPlus).use(VueMarkdownEditor).mixin({
    // 混入baseUrl
    data() {
        return {
            baseURL
        }
    }
}).mount('#app')
