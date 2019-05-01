
//TODO: Publish as `gulp-concat`

/* REQUIRE */

const _ = require ( 'lodash' ),
      PluginError = require ( 'plugin-error' ),
      Vinyl = require ( 'vinyl' ),
      forAll = require ( './forall' );

/* UTILITIES */

function getContents ( config, files ) {

  return files.map ( file => {

    const contents = file.contents.toString ( 'utf8' ),
          isWrapper = !!contents.match ( config.wrapperContentRe );

    return { contents, isWrapper };

  });

}

function partitionContents ( contents ) {

  return _.partition ( contents, content => !content.isWrapper );

}

function getFileContents ( config, normals, wrapper ) {

  const contents = normals.map ( normal => normal.contents ).filter ( _.identity ).join ( config.separator );

  if ( !wrapper ) return contents;

  return wrapper.contents.replace ( config.wrapperContentRe, match => `${match}\n\n${contents}` );

}

function getFile ( name, contents ) {

  return new Vinyl ({
    path: _.isFunction ( name ) ? name () : name,
    contents: new Buffer ( contents )
  });

}

/* CONCAT */

function concat ( files, fileName, config = {} ) {

  if ( !files.length ) return;

  /* CONFIG */

  config = _.merge ({
    separator: '\n',
    wrapperContentRe: /@concat-content/g,
  }, config );

  /* CONCAT */

  const contents = getContents ( config, files ),
        [normals, wrappers] = partitionContents ( contents );

  if ( wrappers.length > 1 ) return new PluginError ( 'Concat', 'Multiple wrappers are not supported' );

  const fileContents = getFileContents ( config, normals, wrappers[0] ),
        file = getFile ( fileName, fileContents );

  return file;

}

/* EXPORT */

module.exports = forAll ( concat );
