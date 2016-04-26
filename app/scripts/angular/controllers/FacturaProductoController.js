/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FacturaProductoController', function ($scope, NgTableParams, toaster, $timeout, facturaProductoService, $location, $state, $stateParams) {

    $scope._facturaProducto = {
        "idFacturaProducto": null,
        "proveedor": null,
        "monto": null,
        "fechaFactura": "",
        "fechaCreacion": "",
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null,
        "estado": true,
        "observaciones": null,
        "estadoLocal": null,
        "numeroFactura": "",
        "carga": null
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


    $scope.listaFacturaProducto = function () {
        $list = facturaProductoService.getAll();
        $list.then(function (datos) {
            if (datos.status === 200) {
                $scope.facturaProductos = datos.data;
                var data = datos.data;
                $scope.tableFacturaProductos = new NgTableParams({
                    page: 1,
                    count: 8
                }, {
                    total: data.length,
                    getData: function (params) {
                        data = $scope.facturaProductos;
                        params.total(data.length);
                        if (params.total() <= ((params.page() - 1) * params.count())) {
                            params.page(1);
                        }
                        return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    }});
            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: "¡Op's algo paso!, comunicate con el administrador.",
                    showCloseButton: false
                });
            }
        });
    };

    $scope.detallesFacturaProducto = function () {
        var idFacturaProducto = parseInt($stateParams.idFactura);
        $detail = facturaProductoService.detail(idFacturaProducto);
        $detail.then(function (datos) {
            if (datos.status === 200) {
                if (datos.data.carga === false) {
                    $state.go('^.producto-lista');
                } else {
                    $scope.detalle = datos.data;
                }
            }
        });
    };

    $scope.finalizarCargaFactura = function () {
        var idFacturaProducto = parseInt($stateParams.idFactura);
        $finish = facturaProductoService.finish(idFacturaProducto);
        $finish.then(function (datos) {
            console.log(datos);
            if (datos.status === 200) {
                toaster.pop({
                    type: 'success',
                    title: 'Exito',
                    body: 'Carga finalizada.',
                    showCloseButton: false
                });
                $timeout(function timer() {
                    $state.go('^.producto-lista');
                }, 2000);
            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: "¡Op's algo paso!, comunicate con el administrador.",
                    showCloseButton: false
                });
            }
        });
    };

    $scope.agregarProductoFactura = function () {
        var idFacturaProducto = parseInt($stateParams.idFactura);
        $state.go('^.producto-agregar', {"idFactura": idFacturaProducto});
    };

    $scope.agregarFacturaProducto = function (facturaProducto) {
        $add = facturaProductoService.add(facturaProducto);
        $add.then(function (datos) {
            if (datos.status === 200) {
                toaster.pop({
                    type: 'success',
                    title: 'Exito',
                    body: 'Factura de producto agregada con exito.',
                    showCloseButton: false
                });
                $timeout(function timer() {
                    $state.go('^.agregar-producto-factura', {"idFactura": datos.data.msg});
                }, 2000);
            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: "¡Op's algo paso!, comunicate con el administrador.",
                    showCloseButton: false
                });
            }
        });
    };


});

