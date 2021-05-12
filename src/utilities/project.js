
/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      {color} = require ( 'specialist' ),
      sha1 = require ( 'sha1' ),
      file = require ( './file' ),
      gutil = require ( './gutil' );

/* PROJECT */

const project = {

  getSrcPaths ( config ) {

    const src = _.castArray ( config.paths.tokens.src );

    return src.map ( gutil.abs );

  },

  checkSrcPaths ( config ) {

    const src = project.getSrcPaths ( config ),
          missing = src.filter ( _.negate ( file.exists ) );

    if ( !missing.length ) return;

    console.error ( color.red ( `Source path(s) not found:\n  ${missing.map ( m => color.underline ( m ) ).join ( '\n  ' )}` ) );

    process.exit ( 1 );

  },

  getDistPath ( config ) {

    return gutil.abs ( config.paths.tokens.dist );

  },

  getTempPath ( config ) { // In order to allow for multiple simultaneous compilations

    return path.resolve ( __dirname, '..', '..', '.temp', project.getHash ( config ) );

  },

  getHash ( config ) { // Uniquely identifies a `paths.tokens.src`, and `paths.tokens.dist` combination

    const src = project.getSrcPaths ( config ),
          dist = project.getDistPath ( config ),
          id = `${src.join ( '|' )}|${dist}`,
          hash = sha1 ( id );

    return hash;

  },

  initEngines ( project ) {

    _.set ( project, 'plugins.autoprefixer.options.overrideBrowserslist', project.browsers );

    const babelPreset = _.get ( project, 'plugins.babel.options.presets[0][0]' ),
          isPresetEnv = babelPreset && babelPreset.match ( /preset-env/g );

    if ( isPresetEnv ) {

      if ( project.target === 'web' ) {

        _.set ( project, 'plugins.babel.options.presets[0][1].targets.browsers', project.browsers );

      } else if ( project.target === 'node' ) {

        _.set ( project, 'plugins.babel.options.presets[0][1].targets.node', project.node );

      }

    }

  }

};

/* EXPORT */

module.exports = project;
