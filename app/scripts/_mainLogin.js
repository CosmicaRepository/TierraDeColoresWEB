/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var miApp = angular.module('tierraDeColoresApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngCookies', 'fundoo.services'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when("/", {
                        controller: "_loginController",
                        templateUrl: "views/login.html"
                    })
                    .when("/login", {
                        controller: "_loginController",
                        templateUrl: "viewslogin.html"
                    })
                    .otherwise({
                        redirectTo: "/",
                        templateUrl: "views/login.html"
                    });
        })
        .run(function ($rootScope, $cookies, $window) {
            $rootScope.render = $cookies.get('render');
            var objData = $cookies.getObject('token');
            $rootScope.$on('$routeChangeStart', function () {
                if ($window.location.pathname === "/TierraDeColores/" || $window.location.pathname === "/TierraDeColores/index.html") {
                    if ($rootScope.render === "true") {
                        if (objData.data.role[0].authority === 'ROLE_ADMIN') {
                            $window.location.href = 'home.html#/';
                        } else {
                            $window.location.href = 'ventas.html#/';
                        }
                    }
                }
            });
        });

