
// before.js


// a/after.js


// a/before.js


// require_a.js


// require_b.js


// a/index.before.js
// @require require_b.js


// a/index.override.js
// @priority 10
// @require ./before.js
// @require ./after.js


// a/index.after.js
// @require require_a.js


// a.js


// z.js


// after.js
