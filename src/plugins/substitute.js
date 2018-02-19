
//TODO: Publish as `gulp-substitute`

/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      stringMatches = require ( 'string-matches' ).default,
      forAll = require ( './forall' );

/* UTILITIES */

function getSubstitution ( substitutions, path ) {

  const val = path ? _.get ( substitutions, path ) : substitutions;

  return !_.isObject ( val ) ? val : JSON.stringify ( val );

}

function getUniqMatches ( str, re ) {

  const matches = stringMatches ( str, re );

  return _.uniqBy ( matches, match => match[0] );

}

function getMatchesSubstitutions ( matches, substitutions ) {

  return matches.map ( match => {

    return getSubstitution ( substitutions, match[1] );

  });

}

function fileSubstitute ( file, config ) {

  let contents = file.contents.toString ();

  const matches = getUniqMatches ( contents, config.tokenRe );

  if ( !matches.length ) return;

  const values = getMatchesSubstitutions ( matches, config.substitutions );

  matches.forEach ( ( match, i ) => {

    contents = contents.replace ( match[0], values[i] );

  });

  file.contents = Buffer.from ( contents );

  return { file, matches, values };

}

function log ( stats ) {

  if ( !stats.length ) return;

  const matchesNr = _.sum ( stats.map ( ({ matches }) => matches.length ) ),
        lines = [`Substitutions (${matchesNr}):`];

  stats.forEach ( ({ file, matches, values }) => {

    lines.push ( `${file.path}` );

    matches.forEach ( ( match, i ) => {

      lines.push ( `  '${match[0]}' => '${values[i]}'` );

    });

  });

  console.log ( lines.join ( '\n' ) );

}

/* SUBSTITUTE */

function substitute ( files, config ) {

  /* CONFIG */

  config = _.merge ({
    substitutions: {},
    tokenRe: /\[substitute(?:\.((?:[^\[\]\s]+|\[\d+\]){1,}))?\]/g,
    log: false
  }, config );

  /* SUBSTITUTE */

  const stats = files.map ( file => fileSubstitute ( file, config ) ).filter ( _.identity );

  if ( config.log ) log ( stats );

}

/* EXPORT */

module.exports = forAll ( substitute );
