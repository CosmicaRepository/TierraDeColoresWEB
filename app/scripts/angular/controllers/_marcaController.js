/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('_marcaController', ['$scope', '$http', 'ngTableParams', 'createDialog', '$route', '$timeout', '$cookies', 'Upload', '$location', '_marcaService', 'factoryCache', '$rootScope', function ($scope, $http, ngTableParams, createDialog, $route, $timeout, $cookies, Upload, $location, _marcaService, factoryCache, $rootScope) {

        $scope._marcas = {
            "idMarca": null,
            "nombreMarca": "",
            "fechaCreacion": "",
            "fechaModificacion": null,
            "usuarioCreacion": null,
            "usuarioModificacion": null
        };

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

        $scope.seleccionarMarca = function (marca) {
            $scope.__marca = marca;
        };

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

    }]);


