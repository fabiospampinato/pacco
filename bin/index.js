#!/usr/bin/env node

/* IMPORT */

const execa = require ( 'execa' ),
      path = require ( 'path' );

/* EXECUTE */

const args = ['gulp', ...process.argv.slice ( 2 ), '--shell-cwd', process.cwd ()];
const opts = {
  cwd: path.resolve ( __dirname, '..' ), // Where `gulpfile.js` is located
  stdio: 'inherit'
};

execa.sync ( 'npx', args, opts );
