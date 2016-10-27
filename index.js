const chalk = require('chalk')
setInterval(() => {
  const colour = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow']
  const message = 'HEEEEELLLOOO PERTER'
  console.log(chalk[colour.splice(Math.round(Math.random() * (colour.length - 1)), 1)](message))
}, 300)
