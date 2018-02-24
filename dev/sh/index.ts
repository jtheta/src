import {spawn} from 'child_process'

export default async function sh(script, env = {}) {
  const args = script.split(/\s+/)
  const cmd = args.shift().trim()
  return spawn(cmd, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      ...env,
      PLATFORM_DIR: __dirname
    }
  })
}