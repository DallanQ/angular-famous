define(['angular'], function(angular) {
  'use strict';

  return angular.module('angularFamous.afUtils', [])
    .factory('afUtils', function() {
      return {

        parseAttr: function(value) {
          if (value === 'true') {
            return true;
          }
          else if (value === 'undefined') {
            return void 0;
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
        }

      };
    });
});