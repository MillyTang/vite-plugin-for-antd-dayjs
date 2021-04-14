try {
  require.resolve('dayjs/dayjs.min')
} catch (e) {
  throw new Error(
    'vite-plugin-vue-antd-dayjs plugin requires dayjs to be present in the devDependency ' +
      'tree.'
  )
}
import momentToDayjsPluginsInAntdVue from './map-to-dayjs-plugins'
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
export default function vitePluginVueForAntdDayjs() {
  const isAntdvueId = 'antd-design-vue'
  const  plugins = [
    'isSameOrBefore',
    'isSameOrAfter',
    'advancedFormat',
    'customParseFormat',
    'weekday',
    'weekYear',
    'weekOfYear',
    'isMoment',
    'localeData',
    'localizedFormat',
  ]
  return {
    name: 'vite-plugin-vue-for-antd-dayjs',
    enforce: 'pre', // 加载vite内置插件之前加载
    config: () => ({
      alias: {
        moment: 'dayjs', // set dayjs alias
      }
    }), // 在被解析之前修改 Vite 配置
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    }, // 在解析 Vite 配置后调用
    handleHotUpdate({ modules, server}) {}, // 执行自定义 HMR 更新处理
    options(inputOptions) {
      // 增加 dayjs 的解析文件
      console.log('inputOptions:', inputOptions)
      const initFilePath = path.resolve(__dirname, 'dayjs-use-to-transfer.js')
      const initEntry = require.resolve(initFilePath)
      inputOptions.input = makeEntry(inputOptions.input, initEntry)
      if (inputOptions.output.length) {
        let dayjsOptput = {
          file: 'dayjs-use-to-transfer.js',
          plugins: plugins 
        }
        inputOptions.output.push(dayjsOptput)
      } else {
        inputOptions.output = [dayjsOptput]
      }
      return inputOptions 
    }, // 服务启动时调用
    buildStart() {}, // 服务启动时调用
    resolveId(id) { // 每个传入的模块请求时被调用
      if (id === isAntdvueId) {
        return id
      }
    },
    load(id) { // 每个传入的模块请求时被调用
      if (id === isAntdvueId) {
        let arrPlugins = momentToDayjsPluginsInAntdVue() 
        return arrPlugins.join('') 
      }
    },
    buildEnd() {}, // 在服务器关闭时被调用
    closeBundle() {}
  }
}