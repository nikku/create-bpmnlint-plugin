const assert = require('assert');
const { spawnSync } = require('child_process');

const os = require('os');
const fs = require('fs');
const path = require('path');

const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'foo-'));

const spawnOptions = {
  cwd,
  stdio: 'inherit'
};

// link create-bpmnlint-plugin
spawnSync('npm', [ 'install', `create-bpmnlint-plugin@file:${process.cwd()}` ], spawnOptions);

// execute generator
spawnSync('npx', [ 'create-bpmnlint-plugin', 'test' ], spawnOptions);

// verify generated files
const expectedFiles = [
  '.gitignore',
  'README.md',
  'docs/rules/examples/no-manual-task-correct.bpmn',
  'docs/rules/examples/no-manual-task-incorrect.bpmn',
  'docs/rules/no-manual-task.md',
  'index.js',
  'package.json',
  'rules/no-manual-task.js',
  'rules/target-namespace.js',
  'test.js'
];

const replacedFiles = [
  'README.md',
  'package.json'
];

try {

  console.log('verify file existence');

  for (const expectedFile of expectedFiles) {

    console.log(`\t${expectedFile}`);

    const expectedPath = path.join(cwd, 'bpmnlint-plugin-test', expectedFile);

    assert.equal(fs.existsSync(expectedPath), true, `expected <${ expectedPath }> to exist`);
  }

  console.log();
  console.log('verify ${NAME} replaced');

  for (const replacedFile of replacedFiles) {

    console.log(`\t${replacedFile}`);

    const replacedPath = path.join(cwd, 'bpmnlint-plugin-test', replacedFile);

    assert.equal(fs.readFileSync(replacedPath, 'utf-8').includes('bpmnlint-plugin-test'), true, `expected <${ replacedPath }> to include <bpmnlint-plugin-test>`);
  }

  console.log();
  console.log('cleanup');

  // cleanup
  fs.rmSync(cwd, { recursive: true });
} catch (err) {
  console.log();
  console.log(`FAILED! temp directory ${cwd} left for inspection`);

  throw err;
}