/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global usuarioController */
'use strict';
var miAppHome = angular.module('tierraDeColoresApp',
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
                var uri = 'https://tierradecoloresapi.herokuapp.com/usuarios/logged';
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
                        controller: "LoginController",
                        data: {pageTitle: 'Inicio de sesión.'}
                    })
                    .state('login.bar', {
                        url: '/',
                        templateUrl: "views/login.html",
                        controller: "LoginController",
                        data: {pageTitle: 'Inicio de sesión.'}
                    })
                    /*Paginas de error*/
                    .state('404', {
                        url: '/404',
                        templateUrl: "views/error/404.html",
                        controller: "LoginController",
                        data: {pageTitle: 'Error pagina no encontrada.'}
                    })
                    .state('500', {
                        url: '/500',
                        templateUrl: "views/error/500.html",
                        controller: "LoginController",
                        data: {pageTitle: 'Error fatal.'}
                    })
                    /**
                     * Home para usuario administrador 
                     */
                    .state('home', {
                        url: '/home',
                        abstract: false,
                        templateUrl: "views/inicio.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home'},
                        resolve: {isLogged: auth} /*Verificacion de sesion*/
                    })/*MODULO USUARIOS*/
                    .state('home.perfil-usuario', {
                        url: '/perfil',
                        templateUrl: "views/usuario/perfil.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home - Perfil'}
                    })
                    .state('home.usuario-lista', {
                        url: '/lista-usuarios',
                        templateUrl: "views/usuario/lista.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home - Usuarios'}
                    })
                    .state('home.usuario-agregar', {
                        url: '/agregar-usuario',
                        templateUrl: "views/usuario/nuevoUsuario.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home - Agregar usuario'}
                    })
                    .state('home.usuario-modificar', {
                        url: '/modificar-usuario',
                        templateUrl: "views/usuario/modificarUsuario.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home - Modificar perfil'}
                    })/*FIN MODULO USUARIOS*/
                    /*MODULO FINANZAS*/
                    .state('home.tarjetas', {
                        url: '/tarjetas',
                        templateUrl: "views/tarjeta/panelTarjeta.html",
                        controller: "TarjetaController",
                        data: {pageTitle: 'Home - Tarjetas'}
                    })
                    .state('home.bancos', {
                        url: '/entidades-financieras',
                        templateUrl: "views/banco/panelBanco.html",
                        controller: "EntidadBancariaController",
                        data: {pageTitle: 'Home - Entidades'}
                    })
                    .state('home.planes-pago', {
                        url: '/planes-de-pago',
                        templateUrl: "views/planes/panelPlanes.html",
                        controller: "PlanPagoController",
                        data: {pageTitle: 'Home - Planes de pago'}
                    })/*FIN MODULO FINANZAS*/
                    /*MODULO STOCK*/
                    /*Productos*/
                    .state('home.producto-lista', {
                        url: '/productos',
                        templateUrl: "views/producto/lista.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Productos'}
                    })
                    .state('home.producto-agregar', {
                        url: '/agregar-producto',
                        templateUrl: "views/producto/agregarProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Agregar producto'}
                    })
                    .state('home.producto-busqueda', {
                        url: '/buscar-producto',
                        templateUrl: "views/producto/busquedaProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Busqueda de productos'}
                    })
                    .state('home.producto-detalle', {
                        url: '/producto/:idProducto',
                        templateUrl: "views/producto/detalleProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Detalle de producto'}
                    })/*Fin productos*/
                    /*Categorias*/
                    .state('home.categorias', {
                        url: '/categorias',
                        templateUrl: "views/categoria/categoriaPanel.html",
                        controller: "CategoriaController",
                        data: {pageTitle: 'Home - Categorias'}
                    })
                    /*Marcas*/
                    .state('home.marcas', {
                        url: '/marcas',
                        templateUrl: "views/marcas/marcasPanel.html",
                        controller: "MarcaController",
                        data: {pageTitle: 'Home - Marcas'}
                    })
                    /*Tipo productos*/
                    .state('home.tipo', {
                        url: '/tipo-de-productos',
                        templateUrl: "views/tipo/panelTipo.html",
                        controller: "TipoController",
                        data: {pageTitle: 'Home - Tipo de productos'}
                    })
                    /*Proveedores*/
                    .state('home.proveedor', {
                        url: '/proveedores',
                        templateUrl: "views/proveedor/proveedorPanel.html",
                        controller: "ProveedorController",
                        data: {pageTitle: 'Home - Proveedores'}
                    })
                    .state('home.proveedor-detalle', {
                        url: '/proveedor/:idProveedor',
                        templateUrl: "views/proveedor/detalleProveedor.html",
                        controller: "ProveedorController",
                        data: {pageTitle: 'Home - Detalle de proveedor'}
                    })/*FIN MODULO STOCK*/
                    /*MODULO FACTURACION*/
                    .state('home.facturacion', {
                        url: '/facturacion',
                        templateUrl: "views/factura/lista.html",
                        controller: "FacturaController",
                        data: {pageTitle: 'Home - Facturacion'}
                    })
                    .state('home.factura', {
                        url: '/factura/:idFactura',
                        templateUrl: "views/factura/facturaPanel.html",
                        controller: "FacturaController",
                        data: {pageTitle: 'Home - Nueva factura'}
                    })/*FIN MODULO FACTURACION*/
                    /*Estadisticas*/
                    .state('home.estadisticas', {
                        url: '/estadisticas',
                        templateUrl: "views/charts/chartPanel.html",
                        controller: "ChartController",
                        data: {pageTitle: 'Home - Estadisticas'}
                    });
        })
        .run(function ($rootScope) {            
            $rootScope.previousState;
            $rootScope.currentState;
            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                $rootScope.previousState = from.name;
                $rootScope.currentState = to.name;
            });
        });
