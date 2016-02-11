/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var miApp = angular.module('Tdc', ['ngRoute', 'ngCookies', 'fundoo.services', 'ngFileUpload', 'angular-loading-bar', 'ngAnimate', 'ui.bootstrap', 'ngTable'])
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
                    .when("/usuarios", {
                        controller: "_usuarioController",
                        templateUrl: "views/usuario/lista.html"
                    })
                    .when("/editarUsuario", {
                        controller: "_usuarioController",
                        templateUrl: "views/usuario/modificarUsuario.html"
                    })
                    .when("/agregarUsuario", {
                        controller: "_usuarioController",
                        templateUrl: "views/usuario/nuevoUsuario.html"
                    })
                    .when("/categorias", {
                        controller: "_categoriaController",
                        templateUrl: "views/categoria/categoriaPanel.html"
                    })
                    .when("/marcas", {
                        controller: "_marcaController",
                        templateUrl: "views/marcas/marcasPanel.html"
                    })
                    .when("/tipo-de-productos", {
                        controller: "_tipoController",
                        templateUrl: "views/tipo/panelTipo.html"
                    })
                    .when("/proveedores", {
                        controller: "_proveedorController",
                        templateUrl: "views/proveedor/proveedorPanel.html"
                    })
                    .when("/proveedor/:idProveedor", {
                        controller: "_proveedorController",
                        templateUrl: "views/proveedor/detalleProveedor.html"
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

