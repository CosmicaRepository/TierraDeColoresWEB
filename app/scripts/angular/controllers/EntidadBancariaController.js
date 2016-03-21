/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('EntidadBancariaController', function ($scope, $timeout, $state, NgTableParams, toaster, $route, entidadBancariaService) {


    $scope._entidadBancaria = {
        "idEntidadMonetaria": null,
        "nombreEntidad": "",
        "direccionEntidad": "",
        "telefonoEntidad": "",
        "estadoEntidad": true,
        "fechaCreaciion": "",
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null
    };

    $scope.listaEntidadBancaria = function () {
        $scope.entidadBancarias = "";
        $promesa = entidadBancariaService.getAll();
        $promesa.then(function (datos) {
            $scope.entidadBancarias = datos.data;
            var data = datos.data;
            $scope.tableEntidades = new NgTableParams({
                page: 1,
                count: 8
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.entidadBancarias;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
        });
    };

    $scope.seleccionarEntidad = function (entidad) {
        $scope.entidadSeleccionada = entidad;
    };

    $scope.agregarEntidad = function (entidad) {
        $promesa = entidadBancariaService.add(entidad);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                toaster.pop('success', 'Exito', 'Entidad agregada con exito.');
                $timeout(function timer() {
                    $state.go($state.current, {}, {reload: true});
                }, 1000);
            } else {
                alert("error");
            }
        });
    };

    $scope.modificarEntidad = function (entidad) {
        $promesa = entidadBancariaService.update(entidad);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                entidadBancariaService.getAll().then(function (datos) {
                    $scope.entidadBancarias = datos.data;
                    $scope.tableEntidades.reload();
                });
                toaster.pop('success', 'Exito', 'Entidad modificada con exito.');
            } else {
                alert("error");
            }
        });
    };

    $scope.eliminarEntidad = function () {
        $promesa = entidadBancariaService.delete($scope.entidadSeleccionada);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                entidadBancariaService.getAll().then(function (datos) {
                    $scope.entidadBancarias = datos.data;
                    $scope.tableEntidades.reload();
                });
                toaster.pop('success', 'Exito', 'Entidad eliminada con exito.');
            } else {
                alert("error");
            }
        });
    };
});

