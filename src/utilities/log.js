
/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      notification = require ( './notification' );

/* LOG */

const log = {

  line ( type, style, message ) {

    type = chalk[style]( type );

    return `[${type}] ${message}`;

  },

  pluginError ( error ) {

    /* NOTIFICATION */

    notification.send ({
      title: 'Plugin error [' + error.plugin + ']',
      message: 'A task failed, check the console',
      sound: 'Basso'
    });

    /* LOG */

    const lines = [];

    lines.push ( log.line ( 'Error', 'red', 'Plugin `' + chalk.underline ( error.plugin ) + '` encountered an error' ) );
    if ( error.fileName || error.relativePath || error.file ) lines.push ( log.line ( 'File', 'yellow', error.fileName || error.relativePath || error.file ) );
    if ( error.lineNumber || error.line ) lines.push ( log.line ( 'Line', 'yellow', error.lineNumber || error.line ) );
    if ( error.columnNumber || error.column ) lines.push ( log.line ( 'Column', 'yellow', error.columnNumber || error.column ) );
    lines.push ( log.line ( 'Message', 'yellow', error.messageFormatted || error.message ) );
    if ( error.codeFrame ) lines.push ( log.line ( 'Code', 'yellow', '\n' + error.codeFrame ) );

    console.log ( lines.join ( '\n' ) );

    /* ENDING */

    // Prevents `watch` tasks from crashing

    this.emit ( 'end' );

  }

};

/* EXPORT */

module.exports = log;
