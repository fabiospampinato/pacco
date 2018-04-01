
//TODO: Publish as `babel-plugin-lodash-template-compile`
//TODO: Maybe add support for things like 'lodash.template`my template`'

/* REQUIRE */

const _ = require ( 'lodash' );

/* UTILITIES */

function escapeBackticks ( str ) {

  return str.replace ( '`', '\\`' );

}

function minify ( template ) {

  return template.trim ().replace ( />\s+</gm, '><' );

}

function render ( template, options ) {

  const {templateOptions} = options;

  template = options.minify ? minify ( template ) : template;

  const templateFn = _.template ( template, templateOptions );

  if ( !options.data ) return templateFn;

  const html = escapeBackticks ( templateFn ( options.data ) );

  return `\`${html}\``;

}

/* LODASH TEMPLATE COMPILE */

function lodashTemplateCompile ({ types }) {

  return {

    visitor: {

      CallExpression ( path, { opts } ) {

        const {node} = path;

        if ( !node.callee.property || node.callee.property.name !== 'template' ) return;
        if ( !['lodash', '_'].includes ( node.callee.object.name ) ) return;
        if ( node.arguments.length !== 1 ) return;

        const arg = node.arguments[0];

        let template;

        if ( types.isStringLiteral ( arg ) ) {

          template = arg.value;

        } else if ( types.isTemplateLiteral ( arg ) ) {

          template = arg.quasis.map ( quasi => quasi.value.cooked ).join ( '' );

        } else {

          return;

        }

        const compiled = render ( template, opts );

        path.replaceWithSourceString ( compiled );

      }

    }

  };

}

/* EXPORT */

module.exports = lodashTemplateCompile;
