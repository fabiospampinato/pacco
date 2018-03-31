
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      project = require ( '../project' ),
      projectPrev = require ( '../project/previous' );

/* CHANGED */

const changed = {

  _previous: JSON.parse ( JSON.stringify ( projectPrev ) ), // Using JSON so that all the objects get parsed the same way (basically for supporting functions)
  _current : JSON.parse ( JSON.stringify ( project     ) ), // Using JSON so that all the objects get parsed the same way (basically for supporting functions)

  project ( key ) {

    if ( argv.fresh ) return true;

    return key ? !_.isEqual ( _.get ( changed._current, key ), _.get ( changed._previous, key ) ) : !_.isEqual ( changed._current, changed._previous );

  },

  plugin ( name ) {

    return changed.project ( `plugins.${name}` );

  },

  plugins ( ...names ) {

    return names.length ? names.every ( changed.plugin ) : changed.project ( 'plugins' );

  },

  environment () {

    return changed.project ( 'environment' );

  },

  target () {

    return changed.project ( 'target' );

  }

};

/* EXPORT */

module.exports = changed;
