/**
 * Controlador de Proveedores encargado de procesar datos para el objeto Proveedor
 * en la base de datos
 * @param {type} param1
 * @param {type} param2
 */
miAppHome.controller('ProveedorController', function ($scope, $http, $routeParams, ngTableParams, createDialog, $route, $timeout, $cookies, $location, _proveedorService) {

    /**
     * Modelo de objeto Proveedor utilizado para agregar nuevos proveedores
     * a la base de datos.
     */
    $scope._proveedor = {
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
        "fechaModificacion": null
    };

    /**
     * Funcion lista de proveedores, encarga de mostrar todos los proveedorers
     * disponibles en la base de datos.
     * @returns {undefined}
     */
    $scope.listaProveedores = function () {
        $scope.proveedores = "";
        $promesa = _proveedorService.getAll();
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $scope.proveedores = datos.data;
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion agregar Proveedor, encargada de agregar un nuevo proveedor
     * a la base de datos.
     * @param {type} proveedor objeto recibido desde la vista.
     * @returns {undefined}
     */
    $scope.agrearProveedor = function (proveedor) {
        $promesa = _proveedorService.add(proveedor);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion eliminar Proveedor, encargada de deshabilitar un proveedor en la 
     * base de datos.
     * @param {type} proveedor
     * @returns {undefined}
     */
    $scope.eliminarProveedor = function (proveedor) {
        $promesa = _proveedorService.delete(proveedor);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion seleccionar, selecciona un Proveedor desde una tabla en la vista
     * @param {type} proveedor objeto proveedor recibido desde la vista.
     * @returns {undefined}
     */
    $scope.seleccionarProveedor = function (proveedor) {
        $scope.__proveedor = proveedor;
    };


    /**
     * Funcion modificar Proveedor, encargadad de modificar un objeto en la base
     * de datos.
     * @param {type} proveedor
     * @returns {undefined}
     */
    $scope._modificarProveedor = function (proveedor) {
        console.log(proveedor);
        $promesa = _proveedorService.update(proveedor);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion buscar proveedor, busca un proveedor apartir del id del proveedor
     * @returns {undefined}
     */
    $scope.buscarProveedor = function () {
        /* id proveniente de la url */
        var idProveedor = $routeParams.idProveedor;
        $promesa = _proveedorService.searchById(idProveedor);
        $promesa.then(function (datos) {
            console.log(datos);
            if (datos.status !== 200 || datos.data.estadoProveedor === false) {
                $location.path("/proveedores");
            } else {
                $scope.foundProveedor = datos.data;
            }
        });
    };


    /**
     * Configuracion para la directiva select para la busqueda dinamica de 
     * proveedores
     */
    $scope.selectProveedorConf = {
        mode: 'object',
        id: 'idProveedor',
        text: 'nombreProveedor',
        options: function (searchText) {
            var token = $cookies.getObject('token');
            return $http({
                url: 'http://localhost:8080/proveedor/searchText',
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
