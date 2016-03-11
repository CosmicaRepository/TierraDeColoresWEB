/**
 * Controlador Marca encargador de procesar datos referentes a las marcas en la
 * base de datos.
 * @param {type} param1
 * @param {type} param2
 */
miAppHome.controller('MarcaController', function ($scope, toaster, $http, NgTableParams, $route, $timeout, $cookies, Upload, $location, _marcaService, factoryCache, $rootScope) {

    /**
     * Modelo de objecto Marca usado en la vista para agregar nuevas Marcas.
     */
    $scope._marcas = {
        "idMarca": null,
        "nombreMarca": "",
        "fechaCreacion": "",
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null
    };

    /**
     * Funcion lista de Marcas, encargada de enlistar todas las Marcas disponibles
     * en la base de datos
     * @returns {undefined}
     */
    $scope.listaMarcas = function () {
        $scope.marcas = "";
        $promesa = _marcaService.getListaMarcas();
        $promesa.then(function (datos) {
            var data = datos.data;
            if (datos.status === 200) {
                $scope.marcas = datos.data;
            } else {
                alert("error");
            }
            $scope.tableMarcas = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.marcas;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
        });
    };

    /**
     * Funcion agregar nueva Marca
     * @param {type} marca objeto Marca recibido desde la vista.
     * @returns {undefined}
     */
    $scope.agrearMarca = function (marca) {
        $promesa = _marcaService.addMarca(marca);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
                toaster.pop('success', 'Exito', 'Marca agregada con exito.');
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion eliminar Marca     
     * @returns {undefined}
     */
    $scope.eliminarMarca = function () {
        $promesa = _marcaService.deleteMarca($scope.__marca);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
                toaster.pop('success', 'Exito', 'Marca eliminada con exito.');
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion seleccionar Marca desde una tabla.
     * @param {type} marca objeto Marca seleccionado desde una fila 
     * @returns {undefined}
     */
    $scope.seleccionarMarca = function (marca) {
        $scope.__marca = marca;
    };

    /**
     * Funcion modificar Marca
     * @param {type} marca objeto Marca recibido desde la vista.
     * @returns {undefined}
     */
    $scope._modificarMarca = function (marca) {
        $promesa = _marcaService.updateMarca(marca);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
                toaster.pop('success', 'Exito', 'Marca modificada con exito.');
            } else {
                alert("error");
            }
        });
    };


    /**
     * Configuraciones del objeto select en la vista, encargado de buscar 
     * Marcas por las letras ingresadas
     * @param {type} val string para la busqueda
     * @returns {unresolved}
     */
    $scope.getMarca = function (val) {
        var token = $cookies.getObject('token');
        var uri = 'http://localhost:8080/marcas/searchText';
        return $http({
            url: uri,
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token.data.access_token
            },
            params: {
                'text': val
            }
        }).then(function (response) {
            return response.data.map(function (item) {
                return item;
            });
        });
    };

});


