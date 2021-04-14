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
export default function momentToDayjsPluginsInAntdVue() {
  const plugins = presets['antd-design-vue'].plugins.map(plugin => {
    return `const ${plugin} = require('dayjs/plugin/${plugin}');` 
  })
  const extendPlugins = plugins.map(plugin => {
    return `dayjs.extend(${plugin});` 
  })
  const specialPlugin = [`const antdPlugin = require('vite-plugin-vue-antd-dayjs/src/antd-plugin');dayjs.extend(antdPlugin);`]
  return [...plugins, ...extendPlugins, ...specialPlugin]
}