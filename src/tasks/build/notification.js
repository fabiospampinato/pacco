
/* REQUIRE */

const stripANSI = require ( 'strip-ansi' ),
      project = require ( '../../project' ),
      buildStatus = require ( '../../utilities/build_status' ),
      notification = require ( '../../utilities/notification' );

/* TASK */

function task () {

  const {error, pluginError, success, paths, times} = buildStatus.stats ();

  if ( error ) {

    return notification.send ( `Plugin error [${pluginError.plugin}]`, stripANSI ( pluginError.messageFormatted || pluginError.message ), false );

  } else if ( success ) {

    return notification.send ( `Built [${project.paths.tokens.environment}]`, `Bundle generated in ${times.elapsed}` );

  }

}

/* EXPORT */

module.exports = task;
