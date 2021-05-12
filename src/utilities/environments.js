
/* REQUIRE */

const _ = require ( 'lodash' ),
      {color} = require ( 'specialist' );

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

  },

  checkExistence ( environments, ...objs ) {

    if ( !objs.every ( _.isEmpty ) ) return;

    console.error ( color.red ( `Unknown environment(s) "${environments.map ( env => color.underline ( env ) ).join ( ', ' )}", did you forget to define it?` ) );

    process.exit ( 1 );

  }

};

/* EXPORT */

module.exports = environments;
