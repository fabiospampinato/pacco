
/* REQUIRE */

const _       = require ( 'lodash' ),
      gulp    = require ( 'gulp' ),
      readPkg = require ( 'read-pkg-up' );

/* TASK */

async function task ( done ) {

  const {pkg} = await readPkg ({ cwd: __dirname }),
        name = _.startCase ( pkg.name ),
        version = pkg.version;

  console.log ( `${name} version: ${version}` );

  done ();

}

task.description = 'Display Pacco\'s version';

/* GULP */

gulp.task ( 'version', task );
