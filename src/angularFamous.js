define([
  'angular',
  'directives/afContext',
  'directives/afModifier',
  'directives/afSurface',
  'directives/afView',
  'services/afUtils',
  'famousModule'
], function (angular) {
  return angular.module('angularFamous', [
    'angularFamous.afContext',
    'angularFamous.afModifier',
    'angularFamous.afSurface',
    'angularFamous.afView',
    'angularFamous.afUtils',
    'famous'
  ]);
});