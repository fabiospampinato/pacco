
/* REQUIRE */

const argv = require ( 'yargs' ).argv,
      chalk = require ( 'chalk' ),
      project = require ( '../../project' ),
      projectU = require ( '../../utilities/project' );

/* TASK */

async function task () { //TODO: Improve me

  if ( argv.quiet ) return;

  const dist = projectU.getDistPath ( project );

  setTimeout ( () => {
    console.log ( `Project bundled\n  - Path: ${chalk.yellow ( dist )}` );
  }); // In order to print this at the end

}

/* EXPORT */

module.exports = task;
