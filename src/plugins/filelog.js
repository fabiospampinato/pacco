
//TODO: Publish as `gulp-filelog`

/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      forAll = require ( './forall' );

/* FILE LOG */

function fileLog ( files, config = {} ) {

  if ( files.length ) {

    const lines = [`Files (${files.length})${config.title ? ` in '${chalk.cyan ( config.title )}'` : ''}:`];

    for ( let i = 0, l = files.length; i < l; i++ ) {

      lines.push ( _.padStart ( i + 1, l.toString ().length ) + ' - ' + files[i].path );

    }

    console.log ( lines.join ( '\n' ) );

  } else {

    console.log ( `No files in ${config.title ? `'${chalk.cyan ( config.title )}'` : 'the stream'}` );

  }

}

/* EXPORT */

module.exports = forAll ( fileLog );
