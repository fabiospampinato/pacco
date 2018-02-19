
/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      fs = require ( 'fs' ),
      gulp = require ( 'gulp' ),
      mkdirp = require ( 'mkdirp' ),
      path = require ( 'path' ),
      rdf = require ( 'require-dot-file' );

/* FILE */

const file = {

  exists ( filepath ) {

    try {

      fs.accessSync ( filepath );

      return true;

    } catch ( e ) {

      return false;

    }

  },

  load ( filepath, defaultValue ) {

    const file = _.attempt ( require, filepath );

    if ( _.isError ( file ) ) {

      if ( !_.isUndefined ( defaultValue ) ) return defaultValue;

      console.error ( chalk.red ( `Failed to load "${chalk.underline ( filepath )}"` ) );

      process.exit ( 1 );

    }

    return file;

  },

  loadRecursive ( name, defaultValue ) {

    return rdf ( name ) || defaultValue;

  },

  write ( filepath, content ) {

    mkdirp.sync ( path.dirname ( filepath ) );
    fs.writeFileSync ( filepath, JSON.stringify ( content ) );

  },

  file2moduleCache: {},

  file2module ( f ) {

    const filepath = _.isString ( f ) ? f : f.path;

    if ( file.file2moduleCache[filepath] ) return file.file2moduleCache[filepath];

    if ( !file._file2moduleSrcRe ) {

      const project = require ( '../project' ), // In order to avoid a cyclic dependency
            projectU = require ( './project' ), // In order to avoid a cyclic dependency
            src = projectU.getSrcPaths ( project ),
            srcRe = new RegExp ( `^(${src.map ( _.escapeRegExp ).join ( '|' )})\/` );

      file._file2moduleSrcRe = srcRe;

    }

    const module = filepath.replace ( /[\\|/]+/g, '/' )
                           .replace ( file._file2moduleSrcRe, '' );

    file.file2moduleCache[filepath] = module;

    return module;

  }

};

/* EXPORT */

module.exports = file;
