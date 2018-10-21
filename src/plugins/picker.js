
//TODO: Publish as `gulp-picker` or something

/* REQUIRE */

const _ = require ( 'lodash' ),
      micromatch = require ( 'micromatch' ),
      forAll = require ( './forall' );

/* PICKER */

function picker () {

  const cache = {};

  return {
    pick: forAll ( ( ...args ) => pick ( cache, ...args ) ),
    replace: forAll ( ( ...args ) => replace ( cache, ...args ) ),
    reset: forAll ( ( ...args ) => reset ( cache, ...args ) )
  };

}

/* PICK */

function pick ( cache, files, filterer ) { // Pick a subset of the cached files

  if ( !cache.files ) cache.files = files;

  if ( _.isFunction ( filterer ) ) {

    return cache.files.filter ( filterer );

  } else {

    return cache.files.filter ( file => {

      return micromatch ( [file.path], filterer ).length;

    });

  }

}

/* REPLACE */

function replace ( cache, files, replacer ) { // Replace all files

  return cache.files = replacer ( cache.files, files );

}

/* RESET */

function reset ( cache, files ) { // Reset all files

  return replace ( cache, files, ( cached, files ) => files );

}

/* EXPORT */

module.exports = picker;
