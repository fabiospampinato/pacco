
/* REQUIRE */

const _ = require ( 'lodash' ),
      findUp = require ( 'find-up-json' ),
      fs = require ( 'fs' ),
      {sync: fsizeSync} = require ( 'nodejs-fs-utils/fs/fsize' ),
      gulp = require ( 'gulp' ),
      mkdirp = require ( 'mkdirp' ),
      path = require ( 'path' ),
      {color} = require ( 'specialist' ),
      Upath = require ( './path' );

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

  size ( filepath ) {

    if ( !file.exists ( filepath ) ) return 0;

    return fsizeSync ( filepath );

  },

  load ( filepath, defaultValue ) {

    const file = _.attempt ( require, filepath );

    if ( _.isError ( file ) ) {

      if ( !_.isUndefined ( defaultValue ) ) return defaultValue;

      console.error ( color.red ( `Failed to load "${color.underline ( filepath )}"` ) );

      process.exit ( 1 );

    }

    return file;

  },

  loadRecursive ( name, defaultValue ) {

    const dotfile = findUp ( name, process.cwd () );

    return dotfile ? dotfile.content : defaultValue;

  },

  write ( filepath, content ) {

    mkdirp.sync ( path.dirname ( filepath ) );
    fs.writeFileSync ( filepath, JSON.stringify ( content ) );

  },

  file2componentCache: {},

  file2component ( f ) {

    const filepath = _.isString ( f ) ? f : f.path;

    if ( file.file2componentCache[filepath] ) return file.file2componentCache[filepath];

    if ( !file._file2componentSrcRe ) {

      const project = require ( '../project' ), // In order to avoid a cyclic dependency
            projectU = require ( './project' ), // In order to avoid a cyclic dependency
            src = projectU.getSrcPaths ( project ).map ( Upath.normalize ),
            srcRe = new RegExp ( `^(${src.map ( _.escapeRegExp ).join ( '|' )})\/` );

      file._file2componentSrcRe = srcRe;

    }

    const commponent = Upath.normalize ( filepath ).replace ( file._file2componentSrcRe, '' );

    file.file2componentCache[filepath] = commponent;

    return commponent;

  }

};

/* EXPORT */

module.exports = file;
