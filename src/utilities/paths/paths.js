
/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      tokens = require ( './tokens' ),
      pathU = require ( '../path' ),
      project = require ( '../../project' );

/* PATHS */

const paths = {

  getDir ( key ) {

    const p = paths.getPath ( key );

    if ( !p ) return p;

    const name = path.parse ( p ).base;

    return name.includes ( '.' ) ? path.parse ( p ).dir : p;

  },

  getDirs ( key ) {

    const p = paths.getPath ( key );

    if ( !p || !_.isPlainObject ( p ) ) return p;

    const subkeys = Object.keys ( p ),
          dirs = subkeys.map ( subkey => paths.getDir ( `${key}.${subkey}` ) );

    return _.uniq ( dirs );

  },

  getName ( key ) {

    const p = paths.getPath ( key );

    if ( !p ) return p;

    return path.parse ( p ).base;

  },

  getPath ( key ) {

    const p = _.get ( project.paths, key );

    if ( !_.isString ( p ) && !_.isArray ( p ) ) return p;

    const pt = tokens.parse ( p );

    if ( _.isString ( pt ) ) return pathU.normalize ( pt );

    if ( _.isArray ( pt ) ) return pt.map ( pathU.normalize );

    return pt;

  }

};

/* EXPORT */

module.exports = paths;
