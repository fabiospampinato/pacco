
//TODO: Maybe export as an external module
// Tasks containing `[ALL]` in the description will only be displayed on `--all`

/* REQUIRE */

const _     = require ( 'lodash' ),
      argv  = require ( 'yargs' ).argv,
      execa = require ( 'execa' ),
      gulp  = require ( 'gulp' ),
      log   = require ( './utilities/log' );

/* UTILITIES */

function parseTasks ( tasks ) {

  return tasks.split ( '\n' )
              .map ( mapTask )
              .filter ( _.identity )
              .join ( '\n' );

}

function mapTask ( task ) {

  const re = /\[([^\d]+?)\]\s+/g,
        match = re.exec ( task ),
        show = !match || argv[match[1].toLowerCase ()];

  return show ? task.replace ( re, '' ) : false;

}

/* TASK */

async function task () {

  const {stdout} = await execa ( 'npx', ['gulp', '--tasks', '--depth', 0, '--color'] );

  console.log ( parseTasks ( stdout ) );

}

task.description = 'List available tasks ' + log.options ( ['all'] );

/* GULP */

gulp.task ( 'help', task );
