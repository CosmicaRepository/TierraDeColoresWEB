/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var miApp = angular.module('Tdc', ['ngRoute', 'ngCookies', 'fundoo.services', 'ngFileUpload', 'angular-loading-bar', 'ngAnimate', 'ui.bootstrap'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when("/", {
                        controller: "_usuarioController",
                        templateUrl: "views/inicio.html"
                    })
                    .when("/perfil", {
                        controller: "_usuarioController",
                        templateUrl: "views/usuario/perfil.html"
                    })                    
                    .when("/editarUsuario", {
                        controller: "_usuarioController",
                        templateUrl: "views/usuario/modificarUsuario.html"
                    })                    
                    .when("/productos", {
                        controller: "_usuarioController",
                        templateUrl: "views/producto/lista.html"
                    })
                    .when("/editarProducto", {
                        controller: "_usuarioController",
                        templateUrl: "views/producto/modificarProducto.html"
                    })
                    .otherwise({
                        redirectTo: "/",
                        templateUrl: "views/inicio.html"
                    });
        });

