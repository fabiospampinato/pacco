
/* REQUIRE */

const argv = require ( 'yargs' ).argv,
      chalk = require ( 'chalk' ),
      project = require ( '../../project' ),
      projectU = require ( '../../utilities/project' );

/* TASK */

async function task () {

  return; //TODO: Improve me

  if ( argv.quiet ) return;

  const dist = projectU.getDistPath ( project );

  console.log ( `Project bundled\n  - Path: ${chalk.yellow ( dist )}` );

}

/* EXPORT */

module.exports = task;
