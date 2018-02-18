
/* REQUIRE */

const argv = require ( 'yargs' ).argv,
      chalk = require ( 'chalk' ),
      path = require ( 'path' ),
      project = require ( '../../project' ),
      environment = require ( '../../utilities/environment' );

/* TASK */

async function task () {

  return; //TODO: Improve me

  if ( argv.quiet ) return;

  const gulpCwd = environment.getGulpCwd (),
        distToken = project.paths.tokens.dist,
        dist = path.isAbsolute ( distToken ) ? distToken : path.resolve ( gulpCwd, distToken );

  console.log ( `Project bundled\n  - Path: ${chalk.yellow ( dist )}` );

}

/* EXPORT */

module.exports = task;
