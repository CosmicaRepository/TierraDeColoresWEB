/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('PlanPagoController', function ($scope, planPagoService, $route) {

    $scope._planPago = {
        "idPlanesPago": null,
        "tarjeta": {
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
        },
        "nombrePlanesPago": "",
        "cuotasPlanesPago": null,
        "fechaInicioPlanes": "",
        "fechaFinalizacionPlanes": null,
        "porcentajeInterez": null,
        "fechaCierre": "",
        "estadoPlanes": true,
        "fechaCreacion": "",
        "fechaModificacion": "",
        "usuarioCreacion": null,
        "usuarioMoficacion": null
    };

    $scope.listaPlanPago = function () {
        $scope.planes = "";
        $promesa = planPagoService.getAll();
        $promesa.then(function (datos) {
            $scope.planes = datos.data;
        });
    };

    $scope.agregarPlan = function (planPago) {
        console.log(planPago);
        $promesa = planPagoService.add(planPago);
        $promesa.then(function (datos) {
            console.log(datos);
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

});

