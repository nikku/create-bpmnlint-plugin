{
  "name": "bpmnlint-plugin-${NAME}",
  "version": "0.0.0",
  "description": "The bpmnlint ${NAME} plug-in",
  "main": "index.js",
  "scripts": {
    "all": "npm test",
    "test": "mocha test.js"
  },
  "keywords": [
    "bpmnlint",
    "plugin"
  ],
  "devDependencies": {
    "bpmnlint": "^8.3.2",
    "chai": "^4.2.0",
    "mocha": "^9.1.3"
  },
  "dependencies": {
    "bpmnlint-utils": "^1.1.1"
  },
  "files": [
    "rules",
    "index.js"
  ]
}
