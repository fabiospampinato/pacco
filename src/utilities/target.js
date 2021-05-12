
/* REQUIRE */

const _ = require ( 'lodash' ),
      {color} = require ( 'specialist' );

/* TARGET */

const target = {

  get ( config, target ) {

    return _.get ( config, `targets.${target}` );

  },

  checkExistence ( target, ...objs ) {

    if ( !objs.every ( _.isEmpty ) ) return;

    console.error ( color.red ( `Unknown target "${color.underline ( target )}", did you forget to define it?` ) );

    process.exit ( 1 );

  }

};

/* EXPORT */

module.exports = target;
