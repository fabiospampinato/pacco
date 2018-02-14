
/* REQUIRE */

const _     = require ( 'lodash' ),
      gulp  = require ( 'gulp' ),
      pacco = require ( '../package.json' );

/* TASK */

function task ( done ) {

  const name = _.startCase ( pacco.name ),
        version = pacco.version;

  console.log ( `${name} version: ${version}` );

  done ();

}

task.description = 'Display Pacco\'s version';

/* GULP */

gulp.task ( 'version', task );
