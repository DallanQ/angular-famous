define(['angular'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afUtils', [])
    .factory('afUtils', function() {
      function getInterpolatedAttrs(attrs) {
        var interpolatedAttrs = {};
        for (var attr in attrs) {
          if (attrs.hasOwnProperty(attr) && (typeof attrs[attr] === 'string') && attrs[attr].indexOf('{{') >= 0) {
            interpolatedAttrs[attr] = true;
          }
        }
        return interpolatedAttrs;
      }

      function setAndObserveProperty(target, scope, attrs, interpolatedAttrs, propName, propValue) {
        if (attrs.hasOwnProperty(propName)) {
          var updateFn = function () {
            propValue.setter.call(target, propValue.getter(scope, attrs));
          };
          updateFn();
          // if property is interpolated, observe it
          if (interpolatedAttrs.hasOwnProperty(propName)) {
            attrs.$observe(propName, updateFn);
          }
        }
      }

      return {
        getInterpolatedAttrs: getInterpolatedAttrs,
        setAndObserveProperty: setAndObserveProperty
      };
    });
});
