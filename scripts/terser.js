/**
 * npm install fast-glob
 */
const { spawn } = require('child_process');
const fastGlob = require('fast-glob');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

const rootDir = path.resolve(__dirname, '..');

/**
 * Relative path to root
 */
function root(relPath) {
  return path.resolve(rootDir, relPath);
}

/**
 * Resolve alias
 */
function r(..._path) {
  return path.resolve(..._path);
}

/**
 * File selection
 */
(async () => {
  const glob = './dest/js/**/*.js';
  // const globIgnore = '';

  const files = await fastGlob(root(glob));

  files.forEach(async (file) => {
    console.log(`file: ${file}`);
    const fileParse = path.parse(file);
    const { name, ext, dir } = fileParse;
    const reldir = path.dirname(path.relative(root('dest/js'), file));

    // console.log(`reldir: ${reldir}`);

    const outFile = root(`dest/minified/${reldir}/${name}.min${ext}`);
    console.log(`outFile: ${outFile}`);

    // Pre-commands
    await fsp.mkdir(path.dirname(outFile), { recursive: true });

    // Commands
    command = `npx terser ${file} -o ${outFile} -c "ecma=6,toplevel" -m "toplevel,eval" --mkdir`;

    spawn(command, { stdio: 'inherit', shell: true });
  });
})();
