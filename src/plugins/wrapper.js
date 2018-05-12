
//TODO: Publish as `gulp-wrapper`

/* REQUIRE */

const _ = require ( 'lodash' ),
      PluginError = require ( 'plugin-error' ),
      forAll = require ( './forall' );

/* UTILITIES */

function fileWrap ( file, template, token ) {

  if ( template && token ) {

    file.contentsUnwrapped = file.contents;

    file.contents = Buffer.from ( template.replace ( token, file.contents.toString ( 'utf8' ) ) );

  }

  return file;
}

function fileUnwrap ( file ) {

  if ( file.contentsUnwrapped ) {

    file.contents = file.contentsUnwrapped;

    delete file.contentsUnwrapped;

  }

  return file;

}

/* WRAPPER */

function wrapper ( files, config = {}, wrap = true ) {

  if ( !files.length ) return;

  if ( files.length > 1 ) return new PluginError ( 'Wrapper', 'Only a single file can be wrapped/unwrapped' );

  /* CONFIG */

  config = _.merge ({
    token: '[content]', // Token that will be replaced with the actual content inside a template
    template: false, // The template to use
    templates: {
      default: false,
      unminified: false,
      minified: false
    }
  }, config );

  if ( wrap ) { // WRAP

    const template = config.templates[config.template] || config.templates.default;

    return fileWrap ( files[0], template, config.token );

  } else { // UNWRAP

    return fileUnwrap ( files[0] );

  }

}

/* WRAP */

function wrap ( ...args ) {

  return wrapper.call ( this, ...args, true );

}

/* UNWRAP */

function unwrap ( ...args ) {

  return wrapper.call ( this, ...args, false );

}

/* EXPORT */

module.exports = {
  wrap: forAll ( wrap ),
  unwrap: forAll ( unwrap )
};
