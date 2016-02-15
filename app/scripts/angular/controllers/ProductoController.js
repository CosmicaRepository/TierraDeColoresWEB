/**
 * Controlador Producto, encargado de procesar datos para el objeto Producto
 * @param {type} param1
 * @param {type} param2
 */
miAppHome.controller('ProductoController', function ($scope, $http, factoryProducto, $compile, $routeParams, ngTableParams, createDialog, $route, $timeout, $cookies, Upload, $location, _productoService, factoryCache, $rootScope) {
    /*
     * objeto type encargado de dar formato a los codigos de barra.
     */
    $scope.type = 'CODE128C';

    /**
     * objeto Producto encargado de dar formato al objeto Producto para agregar
     * nuevos Productos
     */
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


    /**
     * Funcion encargada de enlistar los Productos disponibles en la base de 
     * datos
     * @returns {undefined}
     */
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


    /**
     * Funcion encargada de agregar un Producto nuevo a la base de datos.
     * @param {type} producto objeto Producto recibido desde la vista
     * @returns {undefined}
     */
    $scope.agregarProducto = function (producto) {
        var fecha = producto.fechaProducto.getFullYear() + "-" +
                (producto.fechaProducto.getMonth() + 1) + "-" +
                producto.fechaProducto.getDate();
        producto.fechaProducto = fecha;
        $promesa = _productoService.add(producto);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                /* directiva encargada de retrasar 1 segundo la redireccion a 
                 * la correspondiente location. */
                $timeout(function timer() {
                    $location.path("/producto/" + producto.idProducto);
                }, 1000);
            } else {
                alert("error");
            }
        });
    };


    /**
     * Funcion eliminar Producto
     * @param {type} producto  objeto Producto recibido desde la vista.
     * @returns {undefined}
     */
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

    /**
     * Funcion encargada de seleccionar un objeto tipo Producto de una tabla
     * @param {type} producto objeto seleccionado de una fila.
     * @returns {undefined}
     */
    $scope.seleccionarProducto = function (producto) {
        $scope.__producto = producto;
    };

    /**
     * Funcion modificar Producto existente en la base de datos.
     * @param {type} producto objeto producto recibido desde la vista 
     * @returns {undefined}
     */
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

    /**
     * Funcio para la busqueda dinamica de productos y su posterior redireccion
     * a sus respectivos detalles.
     * @returns {undefined}
     */
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

    /**
     * Funcion encargada de mandar a imprimir un div que contiene el codigo de 
     * barra de un Producto.
     * @param {type} divName id del div a imprimir
     * @returns {undefined}
     */
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=500,height=500');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };

    /**
     * configuracion para la busqueda dinamica de Productos para la directiva 
     * select 
     */
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
                params: {
                    'text': searchText
                }
            });
        },
        select2: {
            minimumInputLength: 2
        }
    };
});

