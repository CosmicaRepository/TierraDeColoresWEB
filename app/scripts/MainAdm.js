/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global usuarioController */
"use strict";
var miAppHome = angular.module('tierraDeColoresAppHome',
        ['ngRoute',            
            'highcharts-ng',
            'ngResource',
            'ngTable',
            'toaster',
            'tierraDeColoresApp',
            'aa.select2',
            'ngCookies',
            'ngFileUpload',
            'angular-loading-bar',
            'ngAnimate',
            'ui.bootstrap',
            'ngTable',
            'io-barcode'])
        .config(function ($routeProvider) {
            var auth = function ($cookies, $rootScope, $http, $window, $location) {
                var tk = $cookies.get('a_tk');
                var uri = 'http://localhost:8080/usuarios/logged';
                $http({
                    url: uri,
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
            $routeProvider
                    .when("/", {
                        controller: "UsuarioController",
                        templateUrl: "views/inicio.html",
                        resolve: {authentication: auth}
                    })
                    .when("/perfil", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/perfil.html",
                        resolve: {authentication: auth}
                    })
                    .when("/usuarios", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/lista.html",
                        resolve: {authentication: auth}
                    })
                    .when("/editarUsuario", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/modificarUsuario.html",
                        resolve: {authentication: auth}
                    })
                    .when("/agregarUsuario", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/nuevoUsuario.html",
                        resolve: {authentication: auth}
                    })
                    .when("/categorias", {
                        controller: "CategoriaController",
                        templateUrl: "views/categoria/categoriaPanel.html",
                        resolve: {authentication: auth}
                    })
                    .when("/marcas", {
                        controller: "MarcaController",
                        templateUrl: "views/marcas/marcasPanel.html",
                        resolve: {authentication: auth}
                    })
                    .when("/tipo-de-productos", {
                        controller: "TipoController",
                        templateUrl: "views/tipo/panelTipo.html",
                        resolve: {authentication: auth}
                    })
                    .when("/proveedores", {
                        controller: "ProveedorController",
                        templateUrl: "views/proveedor/proveedorPanel.html",
                        resolve: {authentication: auth}
                    })
                    .when("/proveedor/:idProveedor", {
                        controller: "ProveedorController",
                        templateUrl: "views/proveedor/detalleProveedor.html",
                        resolve: {authentication: auth}
                    })
                    .when("/productos", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/lista.html",
                        resolve: {authentication: auth}
                    })
                    .when("/producto/:idProducto", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/detalleProducto.html",
                        resolve: {authentication: auth}
                    })
                    .when("/agregarProducto", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/agregarProducto.html",
                        resolve: {authentication: auth}
                    })
                    .when("/editarProducto", {
                        controller: "UsuarioController",
                        templateUrl: "views/producto/modificarProducto.html",
                        resolve: {authentication: auth}
                    })
                    .when("/tarjetas", {
                        controller: "TarjetaController",
                        templateUrl: "views/tarjeta/panelTarjeta.html",
                        resolve: {authentication: auth}
                    })
                    .when("/planes-de-pago", {
                        controller: "PlanPagoController",
                        templateUrl: "views/planes/panelPlanes.html",
                        resolve: {authentication: auth}
                    })
                    .when("/bancos", {
                        controller: "EntidadBancariaController",
                        templateUrl: "views/banco/panelBanco.html",
                        resolve: {authentication: auth}
                    })
                    .when("/facturacion", {
                        controller: "FacturaController",
                        templateUrl: "views/factura/lista.html",
                        resolve: {authentication: auth}
                    })
                    .when("/factura/:idFactura", {
                        controller: "FacturaController",
                        templateUrl: "views/factura/facturaPanel.html",
                        resolve: {authentication: auth}
                    })
                    .when("/estadisticas", {
                        controller: "ChartController",
                        templateUrl: "views/charts/chartPanel.html",
                        resolve: {authentication: auth}
                    })
                    .otherwise({
                        redirectTo: "/",
                        templateUrl: "views/inicio.html"
                    });
        });

