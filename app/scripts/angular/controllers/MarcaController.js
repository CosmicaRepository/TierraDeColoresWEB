/**
 * Controlador Marca encargador de procesar datos referentes a las marcas en la
 * base de datos.
 * @param {type} param1
 * @param {type} param2
 */
miApp.controller('MarcaController', function ($scope, $http, ngTableParams, createDialog, $route, $timeout, $cookies, Upload, $location, _marcaService, factoryCache, $rootScope) {

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
            if (datos.status === 200) {
                $scope.marcas = datos.data;
            } else {
                alert("error");
            }
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
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion eliminar Marca
     * @param {type} marca objeto Marca recibido desde la vista
     * @returns {undefined}
     */
    $scope.eliminarMarca = function (marca) {
        $promesa = _marcaService.deleteMarca(marca);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
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
            } else {
                alert("error");
            }
        });
    };


    /**
     * Configuraciones del objeto select en la vista, encargado de buscar 
     * Marcas por las letras ingresadas
     */
    $scope.selectMarcasConf = {
        mode: 'object',
        id: 'idMarca',
        text: 'nombreMarca',
        options: function (searchText) {
            var token = $cookies.getObject('token');
            return $http({
                url: 'http://localhost:8080/marcas/searchText',
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


