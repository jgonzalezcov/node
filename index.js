const fs = require('fs')
if (!fs.existsSync('./operations.js')) {
  const textVar = ' ${arguments.length} '
  const contentOper = `const fs = require('fs')
  const create = (arguments) => {
    if (arguments.length != 5) {
      console.log(\`Has ingresado${textVar}argumentos y los solicitados son los 5 adicionales a la acción registrar:
        ■ Nombre del animal
        ■ Edad
        ■ Tipo de animal
        ■ Color del animal
        ■ Enfermedad
        \`)
    } else if (isNaN(arguments[1])) {
      console.log('La edad debe ser un numero entero')
    } else {
      const savedInfo = JSON.parse(fs.readFileSync('appointments.json', 'utf8'))
      const [name, age, type, color, illness] = arguments
      savedInfo.push({
        name,
        age,
        type,
        color,
        illness,
      })
      fs.writeFileSync('appointments.json', JSON.stringify(savedInfo))
      console.log('La información a sido guardada')
    }
  }
  const read = () => {
    const readInfo = JSON.parse(fs.readFileSync('appointments.json', 'utf8'))
    console.log(readInfo)
  }
  module.exports = { create, read }
  `
  fs.writeFileSync('operations.js', contentOper)
}
if (!fs.existsSync('./appointments.json')) {
  const contAppointments = []
  fs.writeFileSync('appointments.json', JSON.stringify(contAppointments))
}
const arguments = process.argv.slice(2)
const [command] = arguments
const { create, read } = require('./operations')
if (command.toUpperCase() === 'REGISTRAR') {
  create(arguments.slice(1))
} else if (command.toUpperCase() === 'LEER') {
  if (arguments.length > 1) {
    console.log('Solo debes ingresar la acción sin, parametros adicionales')
    return
  }
  read()
} else {
  console.log('La acción seleccionada no es valida')
}
