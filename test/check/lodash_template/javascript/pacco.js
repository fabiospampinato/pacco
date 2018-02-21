// a.js
(function (obj) {
  obj || (obj = {});

  var __t,
      __p = '';

  with (obj) {
    __p += '<h1>Hello ' + ((__t = name) == null ? '' : __t) + '</h1>';
  }
  return __p;
});

(function (obj) {
  obj || (obj = {});

  var __t,
      __p = '';

  with (obj) {
    __p += '<h1>This is just a ' + ((__t = what) == null ? '' : __t) + '</h1>';
  }
  return __p;
});