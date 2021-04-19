const presets = {
  'antd-design-vue': {
    plugins: [
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
    ],
    replaceMoment: true
  }
}
module.exports = function momentToDayjsPluginsInAntdVue() {
  const plugins = presets['antd-design-vue'].plugins.map(plugin => {
    return `import ${plugin} from 'dayjs/plugin/${plugin}';` 
  })
  const extendPlugins =  presets['antd-design-vue'].plugins.map(plugin => {
    return `dayjs.extend(${plugin});` 
  })
  const specialPlugin = [`import 'dayjs/locale/zh-cn';dayjs.locale('zh-cn');`]
  return [...plugins, ...extendPlugins, ...specialPlugin]
}