// copied largely from https://github.com/tnajdek/angular-requirejs-seed

require.config({
  baseUrl: '../src',
  paths: {
    angular: '../bower_components/angular/angular',
    angularMocks: '../bower_components/angular-mocks/angular-mocks',
    text: '../bower_components/requirejs-text/text',
    famous: '../bower_components/famous'
  },
  shim: {
    'angular' : {
      'exports' : 'angular'
    },
    'angularMocks': {
      deps:['angular'],
      'exports':'angular.mock'
    }
  },
  priority: [
    'angular'
  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require( [
  'angular',
  'app.js'
], function(angular, app) {
  angular.element().ready(function() {
    angular.resumeBootstrap([app['name']]);
  });
});