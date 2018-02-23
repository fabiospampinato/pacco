
/* REQUIRE */

const _ = require ( 'lodash' );

/* TARGET */

const target = {

  get ( config, target ) {

    return _.get ( config, `targets.${target}` );

  }

};

/* EXPORT */

module.exports = target;
