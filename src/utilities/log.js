
/* REQUIRE */

const chalk = require ( 'chalk' );

/* LOG */

const log = {

 line ( type, style, message = '' ) {

    type = chalk[style]( type );

    return `[${type}] ${message}`;

  },

  error ( error ) {

    const lines = [];

    if ( error.plugin ) {
      lines.push ( log.line ( 'Error', 'red', 'Plugin `' + chalk.underline ( error.plugin ) + '` encountered an error' ) );
    }

    if ( error.fileName || error.relativePath || error.file ) {
      lines.push ( log.line ( 'File', 'yellow', error.fileName || error.relativePath || error.file ) );
    }

    if ( error.lineNumber || error.line ) {
      lines.push ( log.line ( 'Line', 'yellow', error.lineNumber || error.line ) );
    }

    if ( error.columnNumber || error.column ) {
      lines.push ( log.line ( 'Column', 'yellow', error.columnNumber || error.column ) );
    }

    lines.push ( log.line ( 'Message', 'yellow', error.messageFormatted || error.message ) );

    if ( error.codeFrame ) {
      lines.push ( log.line ( 'Code', 'yellow', `\n${error.codeFrame}` ) );
    }

    if ( error.stack ) {
      lines.push ( log.line ( 'Stack', 'yellow', error.stack ) );
    }

    console.log ( lines.join ( '\n' ) );

    if ( error.cause ) {

      console.log ( log.line ( 'Cause', 'red' ) );

      log.error ( error.cause );

    }

  }

}

/* EXPORT */

module.exports = log;
