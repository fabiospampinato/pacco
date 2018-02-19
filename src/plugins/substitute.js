
/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      PluginError = require ( 'plugin-error' ),
      through = require ( 'through2' );

/* UTILITIES */

function getSubstitution ( substitutions, path ) {

  const val = path ? _.get ( substitutions, path ) : substitutions;

  return !_.isObject ( val ) ? val : JSON.stringify ( val );

}

function getMatches ( string, regex ) {

  const matches = [];

  let match;

  do {

    match = regex.exec ( string );

    if ( match ) matches.push ( match );

  } while ( match );

  return matches;

}

/* WORKER */

function worker ( files, config ) {

  for ( let i = 0, l = files.length; i < l; i++ ) {

    let contents = files[i].contents.toString ();

    const matches = getMatches ( contents, config.tokenRe );

    if ( !matches.length ) continue;

    if ( config.log ) {

      console.log ( chalk.yellow ( files[i].path ) );

    }

    matches.reverse ().forEach ( match => {

      const val = getSubstitution ( config.substitutions, match[1] );

      contents = contents.replace ( match[0], val );

      if ( config.log ) {

        console.log ( `  "${match[0]}" => "${val}"` );

      }

    });

    files[i].contents = Buffer.from ( contents );

  }

  return files;

}

/* SUBSTITUTE */

function substitute ( substitutions, config ) {

  /* CONFIG */

  config = _.merge ({
    substitutions,
    tokenRe: /\[pacco(?:\.((?:[^\[\]\s]+|\[\d+\]){1,}))?\]/g,
    log: false
  }, config );

  /* VARIABLES */

  let files = [];

  /* SUBSTITUTE */

  return through.obj ( function ( file, encoding, callback ) {

    files.push ( file );

    callback ();

  }, function ( callback ) {

    files = worker ( files, config );

    if ( files instanceof PluginError ) {

      callback ( files );

    } else {

      for ( let i = 0, l = files.length; i < l; i++ ) {

        this.push ( files[i] );

      }

      callback ();

    }

  });

}

/* EXPORT */

module.exports = substitute;
