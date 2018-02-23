
// All the properties of the active environment(s) will be merged with the basic object

/* ENVIRONMENTS */

const environments = {
  production: {},
  development: {
    plugins: {
      autoprefixer: {
        enabled: false
      },
      babel: {
        enabled: false
      },
      htmlmin: {
        enabled: false
      },
      imagemin: {
        enabled: false
      },
      jsonminify: {
        enabled: false
      },
      postcss: {
        enabled: false
      },
      uglify: {
        enabled: false
      }
    }
  }
};

/* EXPORT */

module.exports = environments;
