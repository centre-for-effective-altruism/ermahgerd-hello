const chalk = require('chalk')
const inquirer = require('inquirer')
const ermahgerd = require('node-ermahgerd').translate

const questions = [
  {
    type: 'list',
    name: 'mode',
    message: 'What do you want to display',
    choices: [
      'Greeting',
      'Arbitrary Text'
    ]
  },
  {
    name: 'name',
    message: 'Type your name',
    when: (answers) => answers.mode === 'Greeting' && answers.mode !== 'Exit'
  },
  {
    name: 'message',
    message: 'Write your message',
    when: (answers) => answers.mode === 'Arbitrary Text' && answers.mode !== 'Exit'
  }
]

function run (runs) {

  if (runs > 0) {
    questions[0].choices.push('Exit')
  }
  inquirer.prompt(questions)
    .then((answers) => {
      if (answers.mode === 'Exit') return process.exit()
      let message
      if (answers.name) {
        message = greeting(answers.name)
      } else if (answers.message) {
        message = answers.message
      }

      displayMessage(message, 40, () => {
        runs += 1
        run(runs)
      })
    })
}

function displayMessage (message, repetitions = 20, cb) {
  if (typeof repetitions === 'function') {
    cb = repetitions
    repetitions = 20
  }
  if (typeof cb !== 'function') {
    throw TypeError('displayMessage requires a callback function')
  }

  const colour = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow']
  console.log(chalk[colour.splice(Math.round(Math.random() * (colour.length - 1)), 1)](ermahgerd(message)))

  repetitions -= 1
  if (repetitions < 0) {
    cb()
    return
  }
  setTimeout(() => { displayMessage(message, repetitions, cb) }, 100)
  return
}

function greeting (name) {
  return `Ohmygod ${name}, how are you? It's wonderful to see you!`
}

run(0)
