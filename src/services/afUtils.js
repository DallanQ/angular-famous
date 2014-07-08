define(['angular'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afUtils', [])
    .factory('afUtils', function() {
      function watchProperty(target, scope, attrs, propName, propValue) {
        if (attrs.hasOwnProperty(propName)) {
          scope.$watch(function() {
            return propValue.getter(scope, attrs);
          }, function(newValue) {
            propValue.setter.call(target, newValue);
          }, true);
        }
      }

      return {
        watchProperty: watchProperty
      };
    });
});
