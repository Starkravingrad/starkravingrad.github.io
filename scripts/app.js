'use strict';

/**
 * @ngdoc overview
 * @name lycrabeatscomApp
 * @description
 * # lycrabeatscomApp
 *
 * Main module of the application.
 */
angular
  .module('lycrabeatscomApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/music', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/info', {
        templateUrl: 'views/main.html',
        controller: 'PortfolioCtrl'
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl'
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/bio', {
        templateUrl: 'views/bio.html',
        controller: 'BioCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
