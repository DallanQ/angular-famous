define([
  'angular',
  'angularFamous',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('angularFamousExamples.header-footer-layout', [
    'angularFamous',
    'ui.router'
  ])

    .config(function ($stateProvider) {
      $stateProvider.state('header-footer-layout', {
        url: '/header-footer-layout',
        controller: 'HeaderFooterLayoutController',
        templateUrl: 'scripts/header-footer-layout/header-footer-layout.tpl.html'
      });
    })

    .controller('HeaderFooterLayoutController', function() {

    });

});