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
            'ngMessages',
            'ui.mask',
            'ngTable',
            'toaster',
            'ngCookies',
            'ngFileUpload',
            'angular-loading-bar',
            'ngAnimate',
            'ui.bootstrap',
            'ngTable',
            'ngMaterial',
            'ui.router',
            'kendo.directives',
            'ngDialog',
            'LocalStorageModule',
            'focus-if',
            'io-barcode'])
        .config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, localStorageServiceProvider) {
            localStorageServiceProvider
                    .setPrefix('myApp');
            cfpLoadingBarProvider.includeSpinner = false; /*Activar/Desactivar Spinner.*/
            var uri = 'https://tierradecoloresapi.herokuapp.com/usuarios/logged';
            var session = 'https://tierradecoloresapi.herokuapp.com/usuarios/activeSession';
            var auth = function ($rootScope, $http, $state, $timeout, $cookies) {
                var tk = $cookies.get('a_tk');
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
                    if (response.status === 403) {
                        $rootScope.isLoggedIn = false;
                        $timeout(function timer() {
                            $state.go('ventas');
                        }, 100);
                    }
                });
            };
            var activeSession = function ($http, $state, $timeout, $rootScope, $cookies) {
                var tk = $cookies.get('a_tk');
                $http({
                    url: session,
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + tk,
                        'Content-type': 'application/json'
                    }
                }).then(function (datos) {
                    if (datos.status === 200) {
                        $timeout(function timer() {
                            $state.go(datos.data.msg);
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
                        data: {pageTitle: 'Inicio de sesión.'},
                        resolve: {isLogged: activeSession}
                    })
                    .state('login.bar', {
                        url: '/',
                        templateUrl: "views/login.html",
                        controller: "LoginController",
                        data: {pageTitle: 'Inicio de sesión.'},
                        resolve: {isLogged: activeSession}
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
                        data: {pageTitle: 'Home - Perfil'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.usuario-lista', {
                        url: '/lista-usuarios',
                        templateUrl: "views/usuario/lista.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home - Usuarios'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.usuario-agregar', {
                        url: '/agregar-usuario',
                        templateUrl: "views/usuario/nuevoUsuario.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home - Agregar usuario'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.usuario-modificar', {
                        url: '/modificar-usuario',
                        templateUrl: "views/usuario/modificarUsuario.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Home - Modificar perfil'},
                        resolve: {isLogged: auth}
                    })/*FIN MODULO USUARIOS*/
                    /*MODULO FINANZAS*/
                    .state('home.tarjetas', {
                        url: '/tarjetas',
                        templateUrl: "views/tarjeta/panelTarjeta.html",
                        controller: "TarjetaController",
                        data: {pageTitle: 'Home - Tarjetas'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.bancos', {
                        url: '/entidades-financieras',
                        templateUrl: "views/banco/panelBanco.html",
                        controller: "EntidadBancariaController",
                        data: {pageTitle: 'Home - Entidades'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.planes-pago', {
                        url: '/planes-de-pago',
                        templateUrl: "views/planes/panelPlanes.html",
                        controller: "PlanPagoController",
                        data: {pageTitle: 'Home - Planes de pago'},
                        resolve: {isLogged: auth}
                    })/*FIN MODULO FINANZAS*/
                    /*MODULO STOCK*/
                    /*Productos*/
                    .state('home.producto-lista', {
                        url: '/productos',
                        templateUrl: "views/producto/lista.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Productos'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.producto-factura', {
                        url: '/productos/factura',
                        templateUrl: "views/factura_producto/agregarFactura.html",
                        controller: "FacturaProductoController",
                        data: {pageTitle: 'Home - Factura de producto'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.agregar-producto-factura', {
                        url: '/productos/factura/:idFactura',
                        templateUrl: "views/factura_producto/lista.html",
                        controller: "FacturaProductoController",
                        data: {pageTitle: 'Home - Factura de producto'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.producto-agregar', {
                        url: '/productos/factura/:idFactura/agregar-producto',
                        templateUrl: "views/producto/agregarProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Agregar producto'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.producto-busqueda', {
                        url: '/buscar-producto',
                        templateUrl: "views/producto/busquedaProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Busqueda de productos'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.producto-detalle', {
                        url: '/producto/:idProducto',
                        templateUrl: "views/producto/detalleProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Home - Detalle de producto'},
                        resolve: {isLogged: auth}
                    })/*Fin productos*/
                    /*Categorias*/
                    .state('home.categorias', {
                        url: '/categorias',
                        templateUrl: "views/categoria/categoriaPanel.html",
                        controller: "CategoriaController",
                        data: {pageTitle: 'Home - Categorias'},
                        resolve: {isLogged: auth}
                    })
                    /*Marcas*/
                    .state('home.marcas', {
                        url: '/marcas',
                        templateUrl: "views/marcas/marcasPanel.html",
                        controller: "MarcaController",
                        data: {pageTitle: 'Home - Marcas'},
                        resolve: {isLogged: auth}
                    })
                    /*Tipo productos*/
                    .state('home.tipo', {
                        url: '/tipo-de-productos',
                        templateUrl: "views/tipo/panelTipo.html",
                        controller: "TipoController",
                        data: {pageTitle: 'Home - Tipo de productos'},
                        resolve: {isLogged: auth}
                    })
                    /*Proveedores*/
                    .state('home.proveedor', {
                        url: '/proveedores',
                        templateUrl: "views/proveedor/proveedorPanel.html",
                        controller: "ProveedorController",
                        data: {pageTitle: 'Home - Proveedores'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.proveedor-detalle', {
                        url: '/proveedor/:idProveedor',
                        templateUrl: "views/proveedor/detalleProveedor.html",
                        controller: "ProveedorController",
                        data: {pageTitle: 'Home - Detalle de proveedor'},
                        resolve: {isLogged: auth}
                    })/*FIN MODULO STOCK*/
                    /*MODULO FACTURACION*/
                    .state('home.facturacion', {
                        url: '/facturacion',
                        templateUrl: "views/factura/lista.html",
                        controller: "FacturaController",
                        data: {pageTitle: 'Home - Facturacion'},
                        resolve: {isLogged: auth}
                    })
                    .state('home.factura', {
                        url: '/factura/:idFactura',
                        templateUrl: "views/factura/facturaPanel.html",
                        controller: "FacturaController",
                        data: {pageTitle: 'Home - Nueva factura'},
                        resolve: {isLogged: auth}
                    })/*FIN MODULO FACTURACION*/
                    /*Estadisticas*/
                    .state('home.estadisticas', {
                        url: '/estadisticas',
                        templateUrl: "views/charts/chartPanel.html",
                        controller: "ChartController",
                        data: {pageTitle: 'Home - Estadisticas'},
                        resolve: {isLogged: auth}
                    })
                    /*MODULO DISTRIBUCION*/
                    .state('home.distribucion', {
                        url: '/distribuir',
                        templateUrl: 'views/distribucion/distribucionPanel.html',
                        controller: 'DistribucionController',
                        data: {pageTitle: 'Home - Distribución'},
                        resolve: {isLogged: auth}
                    })
                    /*Panel distribuir factura*/
                    .state('home.distribuir-factura', {
                        url: '/distribuir/:idFactura',
                        templateUrl: 'views/distribucion/distribuir.html',
                        controller: 'DistribucionController',
                        data: {pageTitle: 'Home - Distribuir'},
                        resolve: {isLogged: auth}
                    })
                    /*Ventas para usuarios tipo Vendedor*/
                    .state('ventas', {
                        url: '/ventas',
                        abstract: false,
                        templateUrl: "views/ventas.html",
                        controller: "UsuarioController",
                        resolve: {}, /*Revision para saber si es vendedor.*/
                        data: {pageTitle: 'Ventas'}
                    })/*MODULO USUARIOS*/
                    .state('ventas.perfil-usuario', {
                        url: '/perfil',
                        templateUrl: "views/usuario/perfil.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Ventas - Perfil'}
                    })
                    .state('ventas.usuario-modificar', {
                        url: '/modificar-usuario',
                        templateUrl: "views/usuario/modificarUsuario.html",
                        controller: "UsuarioController",
                        data: {pageTitle: 'Ventas - Modificar perfil'}
                    })/*MODULO STOCK*/
                    /*Productos*/
                    .state('ventas.producto-busqueda', {
                        url: '/busqueda-de-productos',
                        templateUrl: "views/producto/busquedaProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Ventas - Busqueda de productos'}
                    })
                    .state('ventas.producto-detalle', {
                        url: '/producto/:idProducto',
                        templateUrl: "views/producto/detalleProducto.html",
                        controller: "ProductoController",
                        data: {pageTitle: 'Ventas - Detalle de producto'}
                    })
                    /*Categorias*/
                    .state('ventas.categorias', {
                        url: '/categorias',
                        templateUrl: "views/categoria/categoriaPanel.html",
                        controller: "CategoriaController",
                        data: {pageTitle: 'Ventas - Categorias'}
                    })
                    /*Marcas*/
                    .state('ventas.marcas', {
                        url: '/marcas',
                        templateUrl: "views/marcas/marcasPanel.html",
                        controller: "MarcaController",
                        data: {pageTitle: 'Ventas - Marcas'}
                    })/*MODULO ESTADISTICAS*/
                    .state('ventas.estadisticas', {
                        url: '/estadisticas',
                        templateUrl: "views/charts/chartPanel.html",
                        controller: "ChartController",
                        data: {pageTitle: 'Ventas - Estadisticas'}
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