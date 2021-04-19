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
    return `var ${plugin} = require('dayjs/plugin/${plugin}');` 
  })
  const extendPlugins =  presets['antd-design-vue'].plugins.map(plugin => {
    return `dayjs.extend(${plugin});` 
  })
  const specialPlugin = [`var antdPlugin = require('vite-plugin-vue-antd-dayjs/src/antd-plugin');dayjs.extend(antdPlugin);`]
  return [...plugins, ...extendPlugins, ...specialPlugin]
}