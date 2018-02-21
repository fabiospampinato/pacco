
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
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

  const {error, pluginError, success, paths, times} = buildStatus.stats ();

  if ( error ) {

    const lines = [];

    lines.push ( line ( 'Error', 'red', 'Plugin `' + chalk.underline ( pluginError.plugin ) + '` encountered an error' ) );

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

    console.log ( lines.join ( '\n' ) );

  } else if ( success && argv.summary !== false ) {

    console.log ( `Bundle generated to "${paths.dist}" in ${times.elapsed}` ); //TODO: Output more informations, like the size of the bundle

  }

}

/* EXPORT */

module.exports = task;
