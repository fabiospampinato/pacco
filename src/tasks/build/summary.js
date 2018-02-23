
/* REQUIRE */

const argv = require ( 'yargs' ).argv,
      bytes = require ( 'pretty-bytes' ),
      buildStatus = require ( '../../utilities/build_status' ),
      log = require ( '../../utilities/log' );

/* TASK */

async function task () {

  if ( argv.quiet ) return;

  const {error, pluginError, success, paths, times, sizes} = buildStatus.stats ();

  if ( error ) return log.error ( pluginError );

  if ( !success || argv.summary === false ) return;

  console.log ( `Bundled into "${paths.dist}" (${bytes ( sizes.dist )}) in ${times.elapsed}` );

}

/* EXPORT */

module.exports = task;
