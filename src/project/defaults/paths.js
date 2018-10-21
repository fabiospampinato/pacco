
// All paths are relative to `--config` or, if is not a path or is missing, `process.cwd ()`
// `[token]` will be replaced with values defined in `tokens`
// `tokens.src` can also be an array
// In order to extend a source just add another source to `tokens.src`
// Sources may be either relative: `ext`, `../ext` or absolute `/Users/me/ext`

/* PATHS */

const paths = {
  tokens: {
    src: 'src',
    dist: 'dist',
    bundle: 'pacco',
    target: undefined, // Setted dynamically
    temp: undefined, // Setted dynamically
    env: undefined, // Setted dynamically
    environment: undefined // Setted dynamically
  },
  input: {
    html: '[src]/**/*.html',
    json: '[src]/**/*.json',
    fonts: '[src]/**/*.{eot,ttf,woff,woff2}',
    images: '[src]/**/*.{bmp,gif,ico,jpg,jpeg,png,svg,webp}',
    markdown: '[src]/**/*.md',
    javascript: {
      all: '[src]/**/*.js'
    },
    typescript: {
      all: '[src]/**/*.ts'
    },
    scss: {
      all: '[src]/**/*.scss',
      variables: '[src]/**/variables*.scss',
      functions: '[src]/**/functions*.scss',
      mixins: '[src]/**/mixins*.scss',
      keyframes: '[src]/**/keyframes*.scss',
      style: ['[src]/**/*.scss', '![src]/**/variables*.scss', '![src]/**/functions*.scss', '![src]/**/mixins*.scss', '![src]/**/keyframes*.scss']
    },
    css: {
      all: '[src]/**/*.css'
    }
  },
  output: {
    html: '[dist]/html',
    json: '[dist]/json',
    fonts: '[dist]/fonts',
    images: '[dist]/images',
    markdown: '[dist]/html',
    javascript: {
      unminified: '[dist]/javascript/[bundle].js',
      minified: '[dist]/javascript/[bundle].min.js',
      partial: '[temp]/partials/javascript/concat.js'
    },
    typescript: {
      declaration: '[dist]/typescript/[bundle].d.ts'
    },
    scss: {
      all: '[dist]/scss/[bundle].scss',
      variables: '[dist]/scss/[bundle].variables.scss',
      functions: '[dist]/scss/[bundle].functions.scss',
      mixins: '[dist]/scss/[bundle].mixins.scss',
      keyframes: '[dist]/scss/[bundle].keyframes.scss',
      style: '[dist]/scss/[bundle].style.scss',
      partial: '[temp]/partials/css/scss.css'
    },
    css: {
      unminified: '[dist]/css/[bundle].css',
      minified: '[dist]/css/[bundle].min.css',
      partial: '[temp]/partials/css/css.css'
    }
  },
  clean: ['[dist]', '[temp]']
};

/* EXPORT */

module.exports = paths;
