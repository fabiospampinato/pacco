
/* REQUIRE */

const _ = require ( 'lodash' ),
      fs = require ( 'fs' ),
      gulp = require ( 'gulp' ),
      path = require ( 'path' ),
      rdf = require ( 'require-dot-file' );

/* FILE */

const file = {

  load ( filepath, defaultValue ) {

    const file = _.attempt ( require, filepath );

    if ( _.isError ( file ) ) {

      if ( !_.isUndefined ( defaultValue ) ) return defaultValue;

      throw new Error ( `Failed to load "${filepath}"` );

    }

    return file;

  },

  loadRecursive ( name, defaultValue ) {

    return rdf ( name ) || defaultValue;

  },

  write ( filepath, content ) {

    fs.writeFileSync ( filepath, JSON.stringify ( content ) );

  },

  file2moduleCache: {},

  file2module ({ path: filepath }) {

    if ( file.file2moduleCache[filepath] ) return this.file2moduleCache[filepath];

    if ( !file._file2moduleSrcAbsRe ) {

      const gulpCwd = require ( './environment' ).getGulpCwd (), // In order to avoid a cyclic dependency
            src = _.castArray ( require ( '../project' ).paths.tokens.src ), // In order to avoid a cyclic dependency
            srcAbs = src.map ( src => path.isAbsolute ( src ) ? src : path.resolve ( gulpCwd, src ) ),
            srcAbsRe = new RegExp ( `^(${srcAbs.map ( _.escapeRegExp ).join ( '|' )})\/?` );

      file._file2moduleSrcAbsRe = srcAbsRe;

    }

    const module = filepath.replace ( /[\\|/]+/g, '/' )
                           .replace ( file._file2moduleSrcAbsRe, '' );

    this.file2moduleCache[filepath] = module;

    return module;

  }

};

/* EXPORT */

module.exports = file;
