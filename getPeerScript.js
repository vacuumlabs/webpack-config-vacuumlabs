// returns a yarn command to re-add peer dependencies which as a side effect installs them into node_modules
const deps = require('./package').peerDependencies
const res = []
for (let dep in deps) {
  res.push(`"${dep}@${deps[dep]}"`)
}

const depStr = res.join(' ')
if (depStr.length) {
  process.stdout.write(`yarn add --peer --no-lockfile ${depStr}`)
}
