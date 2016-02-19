/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('TarjetaController', function ($scope, tarjetaService, $timeout, $location, $route, toaster) {

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
        });
    };

    $scope.agregarTarjeta = function (tarjeta) {
        $promesa = tarjetaService.add(tarjeta);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $timeout(function timer() {
                    $route.reload();
                    toaster.pop('success', "Exito", "Tarjeta agregada existosamente.");
                }, 1000);
            } else {
                alert("error");
            }
        });
    };

});

