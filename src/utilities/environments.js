
/* REQUIRE */

const _ = require ( 'lodash' );

/* ENVIRONMENTS */

const environments = {

  parse ( envs ) {

    if ( _.isArray ( envs ) ) {

      return envs.map ( env => _.trim ( env ) );

    } else {

      return environments.parse ( envs.split ( ',' ) );

    }

  },

  pretty ( envs ) {

    if ( _.isString ( envs ) ) return environments.pretty ( envs.split ( ',' ) );

    return envs.join ( ' - ' );

  },

  get ( config, paths ) {

    return paths.map ( path => _.get ( config, `environments.${path}` ) ).filter ( env => env );

  }

};

/* EXPORT */

module.exports = environments;
