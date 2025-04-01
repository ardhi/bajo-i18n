// taken from: https://github.com/i18next/i18next-sprintf-postProcessor/blob/master/src/index.js

function sprintfPostProcessor () {
  const { sprintf } = this.lib

  return {
    name: 'sprintf',
    type: 'postProcessor',

    process (value, key, options) {
      if (!options.sprintf) return value
      try {
        if (Object.prototype.toString.apply(options.sprintf) === '[object Array]') {
          return sprintf(value, ...options.sprintf)
        } else if (typeof options.sprintf === 'object') {
          return sprintf(value, options.sprintf)
        }
      } catch (err) {
        const msg = `${err.message}; text: ${value}`
        throw new Error(msg)
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
