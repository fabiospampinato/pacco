
//TODO: Publish as `babel-plugin-lodash-template-compile`
//TODO: Maybe add support for things like 'lodash`my template`'

/* REQUIRE */

const _ = require ( 'lodash' );

/* UTILITIES */

function escapeBackticks ( str ) {

  return str.replace ( '`', '\\`' );

}

function render ( template, options ) {

  const templateFn = _.template ( template, options );

  if ( !options.data ) return templateFn;

  const templateStr = escapeBackticks ( templateFn ( options.data ) );

  return `\`${templateStr}\``;

}

/* LODASH TEMPLATE */

function lodashTemplate ({ types }) {

  return {

    visitor: {

      CallExpression ( path, { opts } ) {

        const {node} = path;

        if ( node.callee.property.name !== 'template' ) return;
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

module.exports = lodashTemplate;
