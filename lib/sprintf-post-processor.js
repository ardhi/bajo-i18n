// taken from: https://github.com/i18next/i18next-sprintf-postProcessor/blob/master/src/index.js

async function sprintfPostProcessor () {
  const { importPkg } = this.app.bajo
  const Sprintf = await importPkg('sprintf-js')
  const { sprintf, vsprintf } = Sprintf

  return {
    name: 'sprintf',
    type: 'postProcessor',

    process (value, key, options) {
      if (!options.sprintf) return value
      if (Object.prototype.toString.apply(options.sprintf) === '[object Array]') {
        return vsprintf(value, options.sprintf)
      } else if (typeof options.sprintf === 'object') {
        return sprintf(value, options.sprintf)
      }

      return value
    },

    overloadTranslationOptionHandler (args) {
      const values = []

      for (let i = 1; i < args.length; i++) {
        values.push(args[i])
      }

      return {
        postProcess: 'sprintf',
        sprintf: values
      }
    }
  }
}

export default sprintfPostProcessor
