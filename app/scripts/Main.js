/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global usuarioController */
'use strict';
var miAppHome = angular.module('tierraDeColoresAppHome',
        ['ngRoute',
            'highcharts-ng',
            'ngResource',
            'ngTable',
            'toaster',
            'aa.select2',
            'ngCookies',
            'ngFileUpload',
            'angular-loading-bar',
            'ngAnimate',
            'ui.bootstrap',
            'ngTable',
            'ui.router',
            'io-barcode'])
        .config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false; /*Activar/Desactivar Spinner.*/
            var auth = function ($cookies, $rootScope, $http, $state, $timeout) {
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
                        $timeout(function timer() {
                            $state.go('login');
                        }, 100);
                    }
                    if (response.status === 500 || response.status === -1) {
                        $rootScope.isLoggedIn = false;
                        $timeout(function timer() {
                            $state.go('500');
                        }, 100);
                    }
                });
            };
            $urlRouterProvider.otherwise("/404");
            $stateProvider
                    /*Login*/
                    .state('login', {
                        url: '',
                        templateUrl: "views/login.html",
                        controller: "LoginController"
                    })
                    .state('login.bar', {
                        url: '/',
                        templateUrl: "views/login.html",
                        controller: "LoginController"
                    })
                    /*Paginas de error*/
                    .state('404', {
                        url: '/404',
                        templateUrl: "views/error/404.html",
                        controller: "LoginController"
                    })
                    .state('500', {
                        url: '/500',
                        templateUrl: "views/error/500.html",
                        controller: "UsuarioController"
                    })
                    /**
                     * Home para usuario administrador 
                     */
                    .state('home', {
                        url: '/home',
                        abstract: false,
                        templateUrl: "views/inicio.html",
                        controller: "UsuarioController",
                        resolve: {isLogged: auth} /*Verificacion de sesion*/
                    })/*MODULO USUARIOS*/
                    .state('home.perfil-usuario', {
                        url: '/perfil',
                        templateUrl: "views/usuario/perfil.html",
                        controller: "UsuarioController"
                    })
                    .state('home.usuario-lista', {
                        url: '/lista-usuarios',
                        templateUrl: "views/usuario/lista.html",
                        controller: "UsuarioController"
                    })
                    .state('home.usuario-agregar', {
                        url: '/agregar-usuario',
                        templateUrl: "views/usuario/nuevoUsuario.html",
                        controller: "UsuarioController"
                    })
                    .state('home.usuario-modificar', {
                        url: '/modificar-usuario',
                        templateUrl: "views/usuario/modificarUsuario.html",
                        controller: "UsuarioController"
                    })/*FIN MODULO USUARIOS*/
                    /*MODULO FINANZAS*/
                    .state('home.tarjetas', {
                        url: '/tarjetas',
                        templateUrl: "views/tarjeta/panelTarjeta.html",
                        controller: "TarjetaController"
                    })
                    .state('home.bancos', {
                        url: '/entidades-financieras',
                        templateUrl: "views/banco/panelBanco.html",
                        controller: "EntidadBancariaController"
                    })
                    .state('home.planes-pago', {
                        url: '/planes-de-pago',
                        templateUrl: "views/planes/panelPlanes.html",
                        controller: "PlanPagoController"
                    })/*FIN MODULO FINANZAS*/
                    /*MODULO STOCK*/
                    /*Productos*/
                    .state('home.producto-lista', {
                        url: '/productos',
                        templateUrl: "views/producto/lista.html",
                        controller: "ProductoController"
                    })
                    .state('home.producto-agregar', {
                        url: '/agregar-producto',
                        templateUrl: "views/producto/agregarProducto.html",
                        controller: "ProductoController"
                    })
                    .state('home.producto-busqueda', {
                        url: '/buscar-producto',
                        templateUrl: "views/producto/busquedaProducto.html",
                        controller: "ProductoController"
                    })
                    .state('home.producto-detalle', {
                        url: '/producto/:idProducto',
                        templateUrl: "views/producto/detalleProducto.html",
                        controller: "ProductoController"
                    })/*Fin productos*/
                    /*Categorias*/
                    .state('home.categorias', {
                        url: '/categorias',
                        templateUrl: "views/categoria/categoriaPanel.html",
                        controller: "CategoriaController"
                    })
                    /*Marcas*/
                    .state('home.marcas', {
                        url: '/marcas',
                        templateUrl: "views/marcas/marcasPanel.html",
                        controller: "MarcaController"
                    })
                    /*Tipo productos*/
                    .state('home.tipo', {
                        url: '/tipo-de-productos',
                        templateUrl: "views/tipo/panelTipo.html",
                        controller: "TipoController"
                    })
                    /*Proveedores*/
                    .state('home.proveedor', {
                        url: '/proveedores',
                        templateUrl: "views/proveedor/proveedorPanel.html",
                        controller: "ProveedorController"
                    })
                    .state('home.proveedor-detalle', {
                        url: '/proveedor/:idProveedor',
                        templateUrl: "views/proveedor/detalleProveedor.html",
                        controller: "ProveedorController"
                    })/*FIN MODULO STOCK*/
                    /*MODULO FACTURACION*/
                    .state('home.facturacion', {
                        url: '/facturacion',
                        templateUrl: "views/factura/lista.html",
                        controller: "FacturaController"
                    })
                    .state('home.factura', {
                        url: '/factura/:idFactura',
                        templateUrl: "views/factura/facturaPanel.html",
                        controller: "FacturaController"
                    })/*FIN MODULO FACTURACION*/
                    /*Estadisticas*/
                    .state('home.estadisticas', {
                        url: '/estadisticas',
                        templateUrl: "views/charts/chartPanel.html",
                        controller: "ChartController"
                    });
        });

