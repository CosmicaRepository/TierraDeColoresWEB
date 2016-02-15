/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global usuarioController */
"use strict";
var miAppHome = angular.module('tierraDeColoresAppHome', ['ngRoute', 'toaster', 'tierraDeColoresApp', 'aa.select2', 'ngCookies', 'fundoo.services', 'ngFileUpload', 'angular-loading-bar', 'ngAnimate', 'ui.bootstrap', 'ngTable', 'io-barcode'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when("/", {
                        controller: "UsuarioController",
                        templateUrl: "views/inicio.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/perfil", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/perfil.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/usuarios", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/lista.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/editarUsuario", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/modificarUsuario.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/agregarUsuario", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/nuevoUsuario.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/categorias", {
                        controller: "CategoriaController",
                        templateUrl: "views/categoria/categoriaPanel.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/marcas", {
                        controller: "MarcaController",
                        templateUrl: "views/marcas/marcasPanel.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/tipo-de-productos", {
                        controller: "TipoController",
                        templateUrl: "views/tipo/panelTipo.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/proveedores", {
                        controller: "ProveedorController",
                        templateUrl: "views/proveedor/proveedorPanel.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/proveedor/:idProveedor", {
                        controller: "ProveedorController",
                        templateUrl: "views/proveedor/detalleProveedor.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/productos", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/lista.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/producto/:idProducto", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/detalleProducto.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/agregarProducto", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/agregarProducto.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .when("/editarProducto", {
                        controller: "UsuarioController",
                        templateUrl: "views/producto/modificarProducto.html",
                        resolve: {authentication: AuthController.auth}
                    })
                    .otherwise({
                        redirectTo: "/",
                        templateUrl: "views/inicio.html"
                    });
        });
var AuthController = miAppHome.controller('AuthController',
        ['$cookies', '$rootScope', '$http', '$window', '$location',
            function ($cookies, $rootScope, $http, $window, $location) {
                //controlador
            }]);
AuthController.auth = function ($cookies, $rootScope, $http, $window, $location) {
    var tk = $cookies.get('a_tk');
    $http({
        url: 'http://localhost:8080/usuarios/logged',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + tk,
            'Content-type': 'application/json'
        }
    }).then(function successCallback(response) {
        $rootScope.isLoggedIn = true;
    }, function errorCallback(response) {
        if (response.status === 401) {
            $rootScope.isLoggedIn = false;
            $location.path("/login");
        }
    });
};