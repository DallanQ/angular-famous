define(['angular'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afUtils', [])
    .factory('afUtils', function() {
      return {

        parseAttr: function(value) {
          if (value === 'undefined') {
            return void 0;
          }
          else if (value === 'true') {
            return true;
          }
          else if (value === 'false') {
            return false;
          }
          // is numeric
          else if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value);
          }
          return value;
        },

        removeEmptyProperties: function(props) {
          var result = {};
          for (var prop in props) {
            if (props.hasOwnProperty(prop) && props[prop] != null) {
              result[prop] = props[prop];
            }
          }
          return result;
        },

        getInterpolatedAttrs: function(attrs) {
          var interpolatedAttrs = {};
          for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr) && (typeof attrs[attr] === 'string') && attrs[attr].indexOf('{{') >= 0) {
              interpolatedAttrs[attr] = true;
            }
          }
          return interpolatedAttrs;
        },

        hasSomeProperty: function(obj, propNames) {
          for (var i = 0, len = propNames.length; i < len; i++) {
            if (obj.hasOwnProperty(propNames[i])) {
              return true;
            }
          }
          return false;
        }

      };
    });
});