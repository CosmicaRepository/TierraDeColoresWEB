/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var miAppHome = angular.module('tierraDeColoresAppHome', ['ngRoute', 'tierraDeColoresApp', 'aa.select2', 'ngCookies', 'fundoo.services', 'ngFileUpload', 'angular-loading-bar', 'ngAnimate', 'ui.bootstrap', 'ngTable', 'io-barcode'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when("/", {
                        controller: "UsuarioController",
                        templateUrl: "views/inicio.html"
                    })
                    .when("/perfil", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/perfil.html"
                    })
                    .when("/usuarios", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/lista.html"
                    })
                    .when("/editarUsuario", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/modificarUsuario.html"
                    })
                    .when("/agregarUsuario", {
                        controller: "UsuarioController",
                        templateUrl: "views/usuario/nuevoUsuario.html"
                    })
                    .when("/categorias", {
                        controller: "CategoriaController",
                        templateUrl: "views/categoria/categoriaPanel.html"
                    })
                    .when("/marcas", {
                        controller: "MarcaController",
                        templateUrl: "views/marcas/marcasPanel.html"
                    })
                    .when("/tipo-de-productos", {
                        controller: "TipoController",
                        templateUrl: "views/tipo/panelTipo.html"
                    })
                    .when("/proveedores", {
                        controller: "ProveedorController",
                        templateUrl: "views/proveedor/proveedorPanel.html"
                    })
                    .when("/proveedor/:idProveedor", {
                        controller: "ProveedorController",
                        templateUrl: "views/proveedor/detalleProveedor.html"
                    })
                    .when("/productos", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/lista.html"
                    })
                    .when("/producto/:idProducto", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/detalleProducto.html"
                    })
                    .when("/agregarProducto", {
                        controller: "ProductoController",
                        templateUrl: "views/producto/agregarProducto.html"
                    })
                    .when("/editarProducto", {
                        controller: "UsuarioController",
                        templateUrl: "views/producto/modificarProducto.html"
                    })
                    .otherwise({
                        redirectTo: "/",
                        templateUrl: "views/inicio.html"
                    });
        }); 