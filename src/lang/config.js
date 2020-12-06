const vueContent = require('./vue')
const pythonContent = require('./python')
const htmlContent = require('./html')

const lang = {
  'vue':vueContent,
  'py': pythonContent,
  'html': htmlContent
}

module.exports = {
  lang
}