
/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' );

/* TARGET */

const target = {

  get ( config, target ) {

    return _.get ( config, `targets.${target}` );

  },

  checkExistence ( target, ...objs ) {

    if ( !objs.every ( _.isEmpty ) ) return;

    console.error ( chalk.red ( `Unknown target "${chalk.underline ( target )}", did you forget to define it?` ) );

    process.exit ( 1 );

  }

};

/* EXPORT */

module.exports = target;
