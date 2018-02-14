
/* REQUIRE */

const _       = require ( 'lodash' ),
      through = require ( 'through2' );

/* UTILITIES */

function logFiles ( files ) {

  if ( files.length ) {

    let list = 'Files:\n';

    for ( let i = 0, l = files.length; i < l; i++ ) {

      list += _.padEnd ( i + 1, l.toString ().length ) + ' - ' + files[i].path;

      if ( i + 1 < l ) {

        list += '\n';

      }

    }

    console.log ( list );

  } else {

    console.log ( 'No files in the stream' );

  }

}

/* FILE LOG */

function filelog () {

  /* VARIABLES */

  let files = [];

  /* FILE LOG */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    logFiles ( files );

    for ( let i = 0, l = files.length; i < l; i++ ) {

      this.push ( files[i] );

    }

    callback ();

  });

}

/* EXPORT */

module.exports = filelog;
