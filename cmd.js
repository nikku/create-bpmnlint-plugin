#!/usr/bin/env node

const mri = require('mri');

const glob = require('tiny-glob');

const fs = require('fs');
const path = require('path');

const args = mri(process.argv.slice(2));

if (args.help) {
  console.log('Usage: create-bpmnlint-plugin name');

  process.exit(0);
}

const pluginName = args._[0];

if (!pluginName) {
  console.error('No plug-in name specified').
  process.exit(1);
}

const pluginPath = `bpmnlint-plugin-${pluginName}`;

if (fs.existsSync(pluginPath)) {
  console.error(`Folder ${pluginPath} already exists`);
  process.exit(1);
}

async function run() {

  const boilerplatePath = path.join(__dirname, 'boilerplate');

  const files = await glob('**/*', {
    cwd: boilerplatePath,
    filesOnly: true,
    dot: true
  });

  const replaceFiles = [
    'README.md',
    'package.json'
  ];

  console.log(`Creating ${ pluginPath }`);

  for (const file of files) {

    const srcPath = path.join(boilerplatePath, file);

    const destFile = file.endsWith('.tpl') ? file.substring(0, file.length - '.tpl'.length) : file;

    const destPath = path.join(pluginPath, destFile);

    console.log('Creating', destPath);

    const destDirectory = path.dirname(destPath);

    // ensure destination directory exists
    fs.mkdirSync(destDirectory, { recursive: true });

    if (replaceFiles.includes(file)) {

      const contents = fs.readFileSync(srcPath, 'utf8');

      fs.writeFileSync(destPath, contents.replace(/\$\{PLUGIN_NAME\}/g, pluginName), 'utf8');
    } else {
      fs.copyFileSync(srcPath, destPath);
    }

  }

  console.log(`Done.

Now go ahead and try it out:

  cd ${pluginPath}
  npm install
  npm test
` );

}


run().catch(err => {
  console.error(err);
  process.exit(1);
});