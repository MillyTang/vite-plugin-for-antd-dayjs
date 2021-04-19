try {
  require.resolve('dayjs/dayjs.min')
} catch (e) {
  throw new Error(
    'vite-plugin-vue-antd-dayjs plugin requires dayjs to be present in the devDependency ' +
      'tree.'
  )
}
const momentToDayjsPluginsInAntdVue= require('./map-to-dayjs-plugins.js')
// inputOptions type: string | string[] | {[entryName: string]: string}
const makeEntry = (entry, initEntry) => {
  if (typeof entry === "object" && !Array.isArray(entry)) {
    Object.keys(entry).forEach(e => {
      entry[e] = makeEntry(entry[e], initEntry);
    });
    return entry;
  }
  if (typeof entry === "string") {
    return [initEntry, entry];
  }
  if (Array.isArray(entry)) {
    return [initEntry].concat(entry);
  }
}
module.exports = function vitePluginVueForAntdDayjs() {
  const isAntdvueId = 'moment-to-dayjs-for-antd-vue'
  return {
    name: 'vite-plugin-vue-for-antd-dayjs',
    enforce: 'pre', // 加载vite内置插件之前加载
    config: () => ({
      'resolve.alias': {
        moment: 'dayjs', // set dayjs alias
      }
    }), // 在被解析之前修改 Vite 配置
    resolveId(id) { // 每个传入的模块请求时被调用
      if (isAntdvueId === id) {
        console.log('resolveid id test', id)
        return id
      }
    },
    load(id) { // 每个传入的模块请求时被调用
      if (isAntdvueId === id) {
        console.log('load id', id)
        const momentTransforeToDayjs = `import dayjs from 'dayjs';`
        const depStr = momentToDayjsPluginsInAntdVue().join('')
        return momentTransforeToDayjs + depStr 
      }
    },
  }
}