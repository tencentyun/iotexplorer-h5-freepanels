/**
 * From JQuery v3.2.1
 */
// const rbracket = /\[\]$/;
// const _ = require('./underscore');
// const isPlainObject = require('./is-plain-object');

/* function buildParams(prefix, obj, traditional, add) {
	var name;

	if (_.isArray(obj)) {
		obj.forEach((v, i) => {
			if (traditional || rbracket.test(prefix)) {

				// Treat each array item as a scalar.
				add(prefix, v);

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		});
	} else if (!traditional && typeof obj === "object") {

		// Serialize object item.
		for (name in obj) {
			buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
		}

	} else {

		// Serialize scalar item.
		add(prefix, obj);
	}
} */

// Serialize an array of form elements or a set of
// key/values into a query string
/**
 * 将一个对象、数组转为小程序request api能支持的标准x-www-form-urlencoded的数据结构
 *
 * @param a
 * @param traditional
 * @return {Object}
 */
/* function param(a, traditional) {
	var prefix,
		s = {},
		add = function (key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = _.isFunction(valueOrFunction) ?
				valueOrFunction() :
				valueOrFunction;

			// s[s.length] = encodeURIComponent(key) + "=" +
			// 	encodeURIComponent(value == null ? "" : value);
			s[key] = value == null ? '' : value;
			// s[s.length] = {
			// 	[key]:
			// };
		};

	// If an array was passed in, assume that it is an array of form elements.
	if (_.isArray(a) || ( a.jquery && !isPlainObject(a) )) {

		// Serialize the form elements
		_.forEach(a, (value, name) => {
			add(name, value);
		});

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for (prefix in a) {
			buildParams(prefix, a[prefix], traditional, add);
		}
	} */

// 	return s;
// }
/**
 * @see https://www.npmjs.com/package/jquery-param
 */
export const param = function (a): string {
  var s: string[] = [];
  var add = function (k, v) {
    v = typeof v === 'function' ? v() : v;
    v = v === null ? '' : v === undefined ? '' : v;
    s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
  };
  var buildParams = function (prefix, obj) {
    var i, len, key;

    if (prefix) {
      if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          buildParams(
            prefix + '[' + (typeof obj[i] === 'object' && obj[i] ? i : '') + ']',
            obj[i]
          );
        }
      } else if (String(obj) === '[object Object]') {
        for (key in obj) {
          buildParams(prefix + '[' + key + ']', obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (Array.isArray(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      for (key in obj) {
        buildParams(key, obj[key]);
      }
    }
    return s;
  };

  return buildParams('', a).join('&');
};
