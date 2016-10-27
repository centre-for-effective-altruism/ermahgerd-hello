const chalk = require('chalk')
const inquirer = require('inquirer')
const ermahgerd = require('node-ermahgerd').translate

const questions = [
  {
    name: 'name',
    'message': 'Type your name'
  }
]

inquirer.prompt(questions)
  .then((answers) => {
    setInterval(() => {
      const colour = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow']
      const message = ermahgerd(`oh my god! hello ${answers.name}, how are you`)
      console.log(chalk[colour.splice(Math.round(Math.random() * (colour.length - 1)), 1)](message))
    }, 300)
  })

