
/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      gutil = require ( 'gulp-util' ),
      notification = require ( './notification' );

/* LOG */

const log = {

  line ( type, style, message ) {

    type = chalk[style]( type );

    return `[${type}] ${message}\n`;

  },

  error ( error ) {

    /* NOTIFICATION */

    notification.send ({
      title: 'Plugin error [' + error.plugin + ']',
      message: 'A task failed, check the console',
      sound: 'Basso'
    });

    /* LOG */

    let report = '';

    report += log.line ( 'Error', 'red', 'Plugin `' + chalk.underline ( error.plugin ) + '` encountered an error' );
    if ( error.fileName || error.relativePath || error.file ) report += line ( 'File', 'yellow', error.fileName || error.relativePath || error.file );
    if ( error.lineNumber || error.line ) report += line ( 'Line', 'yellow', error.lineNumber || error.line );
    if ( error.columnNumber || error.column ) report += line ( 'Column', 'yellow', error.columnNumber || error.column );
    report += log.line ( 'Message', 'yellow', error.messageFormatted || error.message );
    if ( error.codeFrame ) report += line ( 'Code', 'yellow', '\n' + error.codeFrame );

    console.log ( report );

    /* ENDING */

    // Prevents `watch` tasks from crashing

    this.emit ( 'end' );

  }

};

/* EXPORT */

module.exports = log;
