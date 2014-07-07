define([
  'angular',
  'directives/afClick',
  'directives/afContext',
  'directives/afModifier',
  'directives/afRenderNode',
  'directives/afSurface',
  'directives/afView',
  'services/afUtils',
  'famousModule'
], function (angular) {
  return angular.module('angularFamous', [
    'angularFamous.afClick',
    'angularFamous.afContext',
    'angularFamous.afModifier',
    'angularFamous.afRenderNode',
    'angularFamous.afSurface',
    'angularFamous.afView',
    'angularFamous.afUtils',
    'famous'
  ]);
});