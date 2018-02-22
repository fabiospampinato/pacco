
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      bytes = require ( 'pretty-bytes' ),
      chalk = require ( 'chalk' ),
      project = require ( '../../project' ),
      buildStatus = require ( '../../utilities/build_status' ),
      projectU = require ( '../../utilities/project' );

/* UTILITIES */

function line ( type, style, message ) {

  type = chalk[style]( type );

  return `[${type}] ${message}`;

};

/* TASK */

async function task () {

  if ( argv.quiet ) return;

  const {error, pluginError, success, paths, times, sizes} = buildStatus.stats ();

  if ( error ) {

    const lines = [];

    if ( pluginError.plugin ) {
      lines.push ( line ( 'Error', 'red', 'Plugin `' + chalk.underline ( pluginError.plugin ) + '` encountered an error' ) );
    }

    if ( pluginError.fileName || pluginError.relativePath || pluginError.file ) {
      lines.push ( line ( 'File', 'yellow', pluginError.fileName || pluginError.relativePath || pluginError.file ) );
    }

    if ( pluginError.lineNumber || pluginError.line ) {
      lines.push ( line ( 'Line', 'yellow', pluginError.lineNumber || pluginError.line ) );
    }

    if ( pluginError.columnNumber || pluginError.column ) {
      lines.push ( line ( 'Column', 'yellow', pluginError.columnNumber || pluginError.column ) );
    }

    lines.push ( line ( 'Message', 'yellow', pluginError.messageFormatted || pluginError.message ) );

    if ( pluginError.codeFrame ) {
      lines.push ( line ( 'Code', 'yellow', `\n${pluginError.codeFrame}` ) );
    }

    if ( pluginError.stack ) {
      lines.push ( line ( 'Stack', 'yellow', pluginError.stack ) );
    }

    console.log ( lines.join ( '\n' ) );

  } else if ( success && argv.summary !== false ) {

    console.log ( `Bundled into "${paths.dist}" (${bytes ( sizes.dist )}) in ${times.elapsed}` );

  }

}

/* EXPORT */

module.exports = task;
