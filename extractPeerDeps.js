// create simple .md file with all peer dependencies, ready to be installed
const fs = require('fs')

const deps = require('./package').peerDependencies
const res = []
for (let dep in deps) {
  res.push(`${dep}@${deps[dep].replace(/\s/g, '')}`)
}

const depStr = res.join(' ')

fs.writeFileSync('./peerDeps.md', `
yarn:
\`\`\`
yarn add ${depStr}
\`\`\`

npm:
\`\`\`
npm install ${depStr} --save
\`\`\`
`
)
