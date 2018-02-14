
/* REQUIRE */

const paths = require ( './paths' );

/* INPUT */

const input = {

  getPath ( key ) {

    return paths.getPath ( `input.${key}` );

  }

};

/* EXPORT */

module.exports = input;
