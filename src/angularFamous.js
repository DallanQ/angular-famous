define([
  'angular',
  'directives/afContext',
  'directives/afModifier',
  'directives/afSurface',
  'services/afUtils',
  'famousModule'
], function (angular) {
  return angular.module('angularFamous', [
    'angularFamous.afContext',
    'angularFamous.afModifier',
    'angularFamous.afSurface',
    'angularFamous.afUtils',
    'famous'
  ]);
});