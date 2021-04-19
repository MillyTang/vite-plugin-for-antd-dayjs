# vite-plugin-vue-antd-dayjs

转换 ant-design-vue UI 框架里的moment为dayjs

1. 下载 `dayjs`
2. 下载 `vite-plugin-vue-antd-dayjs`插件
3. 在 `vite.config.js`中增加配置

```bash
yarn add dayjs
yarn add git+ssh://git@github.com:MillyTang/vite-plugin-for-antd-dayjs.git --dev
```

```js
// 引入插件
const vitePluginVueForAntdDayjs = require('vite-plugin-vue-antd-dayjs')
{
  plugins: [
    vue(), // vite vue3 项目中必带的插件
    vitePluginVueForAntdDayjs()
  ]
}
```

```js
// main.js引入
import 'moment-to-dayjs-for-antd-vue'
```
