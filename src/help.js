
// Tasks containing `[ALL]` in the description will only be displayed on `--dev`
// Tasks containing `[ALL]` in the description will only be displayed on `--dev` or `--all`

/* REQUIRE */

const _       = require ( 'lodash' ),
      argv    = require ( 'yargs' ).argv,
      spawn   = require ( 'child_process' ).spawn,
      gulp    = require ( 'gulp' ),
      log     = require ( './utilities/log' ),
      plugins = require ( './config' ).plugins;

/* TASK */

function task () {

  let command = 'gulp --tasks --depth 0 --color';

  command += argv.all
               ? ' | sed "s/\\[ALL\\] //g"' // Strip out `[ALL] `
               : ' | grep "\\[ALL\\]" -v'; // Filter out tasks containing `[ALL]`

  return spawn ( 'npx', ['-c', command], { stdio: 'inherit' } ); //TODO: Maybe spawn gulp itself

}

task.description = 'List available tasks ' + log.options ( ['all'] );

/* GULP */

gulp.task ( 'help', task );
