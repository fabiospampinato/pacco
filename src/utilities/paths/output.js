
/* REQUIRE */

const paths = require ( './paths' );

/* OUTPUT */

const output = {

  getDir ( key ) {

    return paths.getDir ( `output.${key}` );

  },

  getDirs ( key ) {

    return paths.getDirs ( `output.${key}` );

  },

  getName ( key ) {

    return paths.getName ( `output.${key}` );

  },

  getPath ( key ) {

    return paths.getPath ( `output.${key}` );

  }

};

/* EXPORT */

module.exports = output;
