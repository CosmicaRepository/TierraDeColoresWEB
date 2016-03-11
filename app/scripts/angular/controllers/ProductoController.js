/**
 * Controlador Producto, encargado de procesar datos para el objeto Producto
 * @param {type} param1
 * @param {type} param2
 */
miAppHome.controller('ProductoController', function ($scope, toaster, NgTableParams, $rootScope, $http, $routeParams, $route, $timeout, $cookies, $location, _productoService) {
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
        "codigoProducto": null,
        "claseProducto": "",
        "numeroFactura": "",
        "categoria": {
            "idCategoria": null,
            "nombreCategoria": "",
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": "",
            "fechaModificacion": null,
            "estado": true,
            "tipoCategoria": {
                "idTipo": null,
                "nombreTipo": "",
                "usuarioCreacion": null,
                "usuarioModificacion": null,
                "fechaCreacion": "",
                "fechaModificacion": null,
                "estado": true
            }
        },
        "marcas": {
            "idMarca": null,
            "nombreMarca": "",
            "fechaCreacion": "",
            "fechaModificacion": null,
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "estado": true
        },
        "proveedor": {
            "idProveedor": null,
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
            "fechaModificacion": ""
        },
        "sexo": {
            "idSexo": null,
            "nombreSexo": "",
            "fechaCreacion": "",
            "fechaModificacion": null,
            "usuarioCreacion": null,
            "usuarioModificacion": null
        },
        "temporada": {
            "idTemporada": null,
            "nombreTemporada": "",
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": "",
            "fechaModificacion": null
        },
        "descripcion": "",
        "colorProducto": "",
        "precioCosto": null,
        "precioVenta": null,
        "precioLista": null,
        "cantidadTotal": null,
        "cantidadMinima": null,
        "talla": "",
        "fechaProducto": "",
        "estadoProducto": true,
        "fechaCreacion": "",
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null
    };
    /**
     * Funciones encargadas de manejar el datepicker en productos
     */
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: null,
        startingDay: 1
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
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
            var data = datos.data;
            if (datos.status === 200) {
                $scope.productos = datos.data;
            } else {
                toaster.pop('error', "Error", "Un error ha ocurrido.");
            }
            $scope.tableProductos = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.productos;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
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
                    toaster.pop('success', "Exito", "Producto agregado correctamente.");
                    $location.path("/productos");
                }, 1000);
            } else {
                toaster.pop('error', "Error", "Un error ha ocurrido.");
            }
        });
    };

    /**
     * Funcion randomCode regresa un numero random para insertar en un nuevo 
     * producto
     * @returns {undefined}
     */
    $scope.randomCode = function () {
        var marcaId = $scope._producto.marcas.idMarca;
        var talla = $scope._producto.talla;
        var categoriaId = $scope._producto.categoria.idCategoria;
        var codigo = Math.floor((Math.random() * 999) + 100);
        if (marcaId === null && categoriaId === null & talla === "") {
            toaster.pop('error', "Error", "Revisa los campos anteriores.");
        } else {
            $scope._producto.codigoProducto = "" + categoriaId + marcaId + codigo + '-' + talla.toUpperCase();
        }
    };

    /**
     * Funcion eliminar Producto 
     * @returns {undefined}
     */
    $scope.eliminarProducto = function () {
        var idProducto = $routeParams.idProducto;
        $producto = _productoService.searchById(idProducto);
        $producto.then(function (datos) {
            if (datos.status === 200) {
                $promesa = _productoService.delete(datos.data);
                $promesa.then(function (datos) {
                    if (datos.status === 200) {
                        toaster.pop('success', 'Exito', 'EL producto ha sido eliminado exitosamente.');
                        $location.path("/productos");
                    } else {
                        alert("error");
                    }
                });
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
        $scope.__producto.fechaProducto = new Date(producto.fechaProducto);
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
                toaster.pop('success', 'Exito', 'Producto modificado exitosamente.');
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
            width: 1,
            height: 50,
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
            var uri = 'http://localhost:8080/producto/searchText';
            return $http({
                url: uri,
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

