
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      project = require ( '../project' ),
      gutil = require ( '../utilities/gutil' );

/* TASK */

async function task () {

  const dotpath = argv._.length >= 2 ? argv._[1] : false,
        subproject = dotpath ? _.get ( project, dotpath ) : project,
        output = JSON.stringify ( subproject, undefined, 2 );

  setTimeout ( () => console.log ( output ) ); // In order to print this at the end

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'config', 'Display the current configuration', undefined, [['[dotpath]', 'Display a portion of the whole configuration']] );
