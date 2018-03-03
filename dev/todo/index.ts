import out from 'dev/out'

function log(msg) {
  process.stdout.write(msg.split('\n').join('=>') + '\n')
}

export async function todos() {
  log('need to impl this')
}