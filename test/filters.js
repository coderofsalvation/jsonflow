// Generated by CoffeeScript 1.10.0
(function() {
  var jflow, json, path, process;

  jflow = require('json-dataflow');

  path = [];

  json = {
    a: {
      output: [
        {
          "$ref": "#/b"
        }
      ]
    },
    b: {
      output: [
        {
          "$ref": "#/a"
        }
      ]
    },
    c: {
      output: [
        {
          "$ref": "#/a"
        }
      ]
    }
  };

  process = {};

  process.increment = function(node, data) {
    if (data.arr == null) {
      data.arr = [];
    }
    return data.arr.push(new Date());
  };

  process.a = process.b = process.increment;

  jflow.filters.custom.debug = function(node, data) {
    var obj;
    obj = {};
    obj[node.name] = data;
    return console.log(JSON.stringify(obj, null, 2));
  };

  jflow.filters.global.rememberpath = function(node, data) {
    return path.push(node.name);
  };

  jflow.run(json, {
    foo: "bar"
  }, {
    root: 'b',
    process: process
  });

  console.log("path: " + path.join('->'));

}).call(this);
