/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('_productoController', ['$scope', '$http', 'factoryProducto', '$compile', '$routeParams', 'ngTableParams', 'createDialog', '$route', '$timeout', '$cookies', 'Upload', '$location', '_productoService', 'factoryCache', '$rootScope', function ($scope, $http, factoryProducto, $compile, $routeParams, ngTableParams, createDialog, $route, $timeout, $cookies, Upload, $location, _productoService, factoryCache, $rootScope) {

        $scope.type = 'CODE128C';
        $scope._producto = {
            "idProducto": null,
            "categoria": {"idCategoria": null,
                "nombreCategoria": "",
                "usuarioCreacion": 1,
                "usuarioModificacion": null,
                "fechaCreacion": "",
                "fechaModificacion": null,
                "estado": true},
            "marcas": {"idMarca": null,
                "nombreMarca": "",
                "fechaCreacion": "",
                "fechaModificacion": null,
                "usuarioCreacion": null,
                "usuarioModificacion": null,
                "estado": true},
            "proveedor": {"idProveedor": null,
                "nombreProveedor": "",
                "cuitProveedor": "",
                "direccionProveedor": "",
                "paisProveedor": "",
                "provinciaProveedor": "",
                "localidadProveedor": "",
                "codigoPostal": "",
                "telefonoProveedor": "",
                "emailProveedor": "",
                "estadoProveedor": true,
                "usuarioCreacion": null,
                "usuarioModificacion": null,
                "fechaCreacion": "",
                "fechaModificacion": ""},
            "sexo": {"idSexo": null,
                "nombreSexo": "",
                "fechaCreacion": "",
                "fechaModificacion": null,
                "usuarioCreacion": null,
                "usuarioModificacion": null},
            "temporada": {"idTemporada": null,
                "nombreTemporada": "",
                "usuarioCreacion": null,
                "usuarioModificacion": null,
                "fechaCreacion": "",
                "fechaModificacion": null},
            "tipoProducto": {"idTipo": null,
                "nombreTipo": "",
                "usuarioCreacion": null,
                "usuarioModificacion": null,
                "fechaCreacion": "",
                "fechaModificacion": null,
                "estado": true},
            "descripcion": "",
            "colorProducto": "",
            "precioCosto": null,
            "precioVenta": null,
            "cantidadProducto": null,
            "cantidadMinima": null,
            "talla": "",
            "fechaProducto": "",
            "estadoProducto": true,
            "fechaCreacion": "",
            "fechaModificacion": null,
            "usuarioCreacion": 1,
            "usuarioModificacion": null
        };



        $scope.listaProductos = function () {
            $scope.productos = "";
            $promesa = _productoService.getAll();
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $scope.productos = datos.data;
                    select2States = datos.data;
                } else {
                    alert("error");
                }
            });
        };

        $scope.agregarProducto = function (producto) {
            $promesa = _productoService.add(producto);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };

        $scope.eliminarProducto = function (producto) {
            $promesa = _productoService.delete(producto);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };

        $scope.seleccionarProducto = function (producto) {
            $scope.__producto = producto;
        };

        $scope._modificarProducto = function (producto) {
            $promesa = _productoService.update(producto);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };

        $scope.buscarProducto = function () {
            $scope.options = {
                width: 2,
                height: 100,
                displayValue: true,
                font: 'monospace',
                textAlign: 'center',
                fontSize: 15,
                backgroundColor: '#FFFFFF',
                lineColor: '#000000'
            };
            var idProducto = $routeParams.idProducto;
            $promesa = _productoService.searchById(idProducto);
            $promesa.then(function (datos) {
                console.log(datos);
                if (datos.status !== 200) {
                    $location.path("/productos");
                } else {
                    $scope.foundProducto = datos.data;
                }
            });
        };
        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=500,height=500');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        };

        $scope.select2Config = {
            mode: 'object',
            id: 'idProducto',
            text: 'descripcion',
            options: function (searchText) {
                var token = $cookies.getObject('token');
                return $http({
                    url: 'http://localhost:8080/producto/searchText',
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + token.data.access_token                        
                    },
                    params:{
                        'text': searchText
                    }
                });
            },
            select2: {
                minimumInputLength: 2
            }
        };        
    }]);

