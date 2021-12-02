export function calculatePosition(input) {
  return parseCommands(input)
    .reduce((accum, command) => {
      if (command.direction === 'forward') accum.horizontalPosition += command.value
      if (command.direction === 'down') accum.depth += command.value
      if (command.direction === 'up') accum.depth -= command.value
      return accum
    }, { depth: 0, horizontalPosition: 0 })
}

export function calculatePositionCorrectly(input) {
  return parseCommands(input)
    .reduce((accum, command) => {
      if (command.direction === 'forward') {
        accum.horizontalPosition += command.value
        accum.depth = accum.depth + (accum.aim * command.value)
      } 
      if (command.direction === 'down') accum.aim += command.value
      if (command.direction === 'up') accum.aim -= command.value
      return accum
    }, { depth: 0, horizontalPosition: 0, aim: 0 })
}

function parseCommands(input) {
  return input
    .split('\n')
    .filter(s => s !== '')
    .map(command => {
      let [ direction, value ] = command.split(' ')
      return { direction, value: parseInt(value) }
    })
}
