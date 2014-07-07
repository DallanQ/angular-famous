define(['angular'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afUtils', [])
    .factory('afUtils', function() {
      function parseAttr(value) {
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
      }

      function removeEmptyProperties(props) {
        var result = {};
        for (var prop in props) {
          if (props.hasOwnProperty(prop) && props[prop] != null) {
            result[prop] = props[prop];
          }
        }
        return result;
      }

      function getInterpolatedAttrs(attrs) {
        var interpolatedAttrs = {};
        for (var attr in attrs) {
          if (attrs.hasOwnProperty(attr) && (typeof attrs[attr] === 'string') && attrs[attr].indexOf('{{') >= 0) {
            interpolatedAttrs[attr] = true;
          }
        }
        return interpolatedAttrs;
      }

      function hasSomeProperty(obj, propNames) {
        for (var i = 0, len = propNames.length; i < len; i++) {
          if (obj.hasOwnProperty(propNames[i])) {
            return true;
          }
        }
        return false;
      }

      function setAndObserveProperty(target, attrs, interpolatedAttrs, property) {
        if (hasSomeProperty(attrs, property.attrs)) {
          var updateFn = function () {
            property.setter.call(target, property.getter(attrs));
          };
          updateFn();
          // observe interpolated attrs
          for (var i = 0, len = property.attrs.length; i < len; i++) {
            if (interpolatedAttrs[property.attrs[i]]) {
              attrs.$observe(property.attrs[i], updateFn);
            }
          }
        }
      }

      return {
        parseAttr: parseAttr,
        removeEmptyProperties: removeEmptyProperties,
        getInterpolatedAttrs: getInterpolatedAttrs,
        hasSomeProperty: hasSomeProperty,
        setAndObserveProperty: setAndObserveProperty
      };
    });
});