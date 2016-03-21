/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('TarjetaController', function ($scope, $state, NgTableParams, tarjetaService, $timeout, $location, $route, toaster) {

    $scope._tarjeta = {
        "idTarjeta": null,
        "entidadBancaria": {
            "idEntidadMonetaria": null,
            "nombreEntidad": "",
            "direccionEntidad": "",
            "telefonoEntidad": "",
            "estadoEntidad": true,
            "fechaCreaciion": "",
            "fechaModificacion": null,
            "usuarioCreacion": null,
            "usuarioModificacion": null
        },
        "medioPago": {
            "idMedioPago": null,
            "nombrePago": "",
            "estado": true,
            "fechaCreacion": "",
            "fechaModificacion": null,
            "usuarioCreacion": null,
            "usuarioModificacion": null
        },
        "nombreTarjeta": "",
        "estadoTarjeta": true,
        "fechaCreacion": "",
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null
    };

    $scope.listaTarjetas = function () {
        $scope.tarjetas = "";
        $promesa = tarjetaService.getAll();
        $promesa.then(function (datos) {
            $scope.tarjetas = datos.data;
            var data = datos.data;
            $scope.tableTarjetas = new NgTableParams({
                page: 1,
                count: 8
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.tarjetas;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
        });
    };

    $scope.seleccionarTarjeta = function (tarjeta) {
        $scope.tarjetaSeleccionada = tarjeta;
    };

    $scope.agregarTarjeta = function (tarjeta) {
        $promesa = tarjetaService.add(tarjeta);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                toaster.pop('success', "Exito", "Tarjeta agregada existosamente.");
                $timeout(function timer() {
                    $state.go($state.current, {}, {reload: true});                    
                }, 1000);
            } else {
                alert("error");
            }
        });
    };


    $scope.modificarTarjeta = function (tarjeta) {
        $promesa = tarjetaService.update(tarjeta);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $timeout(function timer() {
                    tarjetaService.getAll().then(function (datos) {
                        $scope.tarjetas = datos.data;
                        $scope.tableTarjetas.reload();
                    });
                    toaster.pop('success', "Exito", "Tarjeta modificada existosamente.");
                }, 1000);
            } else {
                alert("error");
            }
        });

    };

    $scope.eliminarTarjeta = function () {
        $promesa = tarjetaService.delete($scope.tarjetaSeleccionada);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $timeout(function timer() {
                    tarjetaService.getAll().then(function (datos) {
                        $scope.tarjetas = datos.data;
                        $scope.tableTarjetas.reload();
                    });
                    toaster.pop('success', "Exito", "Tarjeta eliminada existosamente.");
                }, 1000);
            } else {
                alert("error");
            }
        });
    };


});

