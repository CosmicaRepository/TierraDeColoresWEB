/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('DistribucionController', function ($scope, $rootScope, NgTableParams, ngDialog, toaster, $timeout, facturaProductoService, $state, $stateParams, distribucionService) {

    $scope.alerts = [];
    $scope.modalDistribuir = {
        tierra: null,
        bebelandia: null,
        libertador: null
    };
    $scope.wrapper = {
        "stockTierra": {
            "idStock": null,
            "cantidad": null,
            "idProducto": null,
            "estado": true,
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": null,
            "fechaModificacion": null,
            "idSucursal": null
        },
        "stockBebelandia": {
            "idStock": null,
            "cantidad": null,
            "idProducto": null,
            "estado": true,
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": null,
            "fechaModificacion": null,
            "idSucursal": null
        },
        "stockLibertador": {
            "idStock": null,
            "cantidad": null,
            "idProducto": null,
            "estado": true,
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": null,
            "fechaModificacion": null,
            "idSucursal": null
        }};

    $scope.detallesFacturaProducto = function () {
        var idFacturaProducto = parseInt($stateParams.idFactura);
        $detail = facturaProductoService.detail(idFacturaProducto);
        $detail.then(function (datos) {
            if (datos.status === 200) {
                $scope.detalle = datos.data;
            }
        });
    };

    $scope.listaTierra = function () {
        $tierra = distribucionService.getAll(1);
        $tierra.then(function (datos) {
            var data = datos.data;
            $scope.tierraStock = datos.data;
            $scope.tableTierraStock = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.tierraStock;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
        });
    };

    $scope.listaBebelandia = function () {
        $tierra = distribucionService.getAll(2);
        $tierra.then(function (datos) {
            var data = datos.data;
            $scope.bebelandiaStock = datos.data;
            $scope.tableBebelandiaStock = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.bebelandiaStock;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
        });
    };

    $scope.listaLibertador = function () {
        $tierra = distribucionService.getAll(3);
        $tierra.then(function (datos) {
            var data = datos.data;
            $scope.libertadorStock = datos.data;
            $scope.tableLibertadorStock = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.libertadorStock;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
        });
    };

    $scope.distribuirModal = function (producto) {
        $rootScope.modalProducto = producto;
        ngDialog.open({
            template: 'views/modals/distribucion/modal-distribuir.html',
            className: 'ngdialog-theme-advertencia',
            showClose: false,
            controller: 'DistribucionController',
            closeByDocument: false,
            closeByEscape: false
        });
    };

    $scope.confirmarDistribuir = function (modalDistribuir) {
        var control = 0;
        control = modalDistribuir.tierra + modalDistribuir.bebelandia + modalDistribuir.libertador;
        if (control === $rootScope.modalProducto.cantidadTotal) {
            if (modalDistribuir.tierra !== null) {
                $scope.wrapper.stockTierra.idProducto = $rootScope.modalProducto;
                $scope.wrapper.stockTierra.cantidad = modalDistribuir.tierra;
            }
            if (modalDistribuir.bebelandia !== null) {
                $scope.wrapper.stockBebelandia.idProducto = $rootScope.modalProducto;
                $scope.wrapper.stockBebelandia.cantidad = modalDistribuir.bebelandia;
            }
            if (modalDistribuir.libertador !== null) {
                $scope.wrapper.stockLibertador.idProducto = $rootScope.modalProducto;
                $scope.wrapper.stockLibertador.cantidad = modalDistribuir.libertador;
            }
            ngDialog.open({
                template: 'views/modals/distribucion/confirmacion-distribuir.html',
                className: 'ngdialog-theme-advertencia',
                showClose: false,
                controller: 'DistribucionController',
                closeByDocument: false,
                closeByEscape: false,
                data: $scope.wrapper
            });
            //            $distribute = distribucionService.add($scope.wrapper);
        } else {
            $scope.alerts.push({
                type: 'danger',
                msg: 'La cantidad total de productos a distribuir debe ser igual a la cantidad total de productos en almacen.'
            });
        }
    };

    $scope.finalizarDistribucion = function () {
        $scope.sendWrapper = {
            stockTierra: null,
            stockBebelandia: null,
            stockLibertador: null
        };
        if ($scope.ngDialogData.stockTierra.idProducto !== null && $scope.ngDialogData.stockTierra.cantidad) {
            $scope.sendWrapper.stockTierra = $scope.ngDialogData.stockTierra;
        }
        if($scope.ngDialogData.stockBebelandia.idProducto !== null && $scope.ngDialogData.stockBebelandia.cantidad){
            $scope.sendWrapper.stockBebelandia = $scope.ngDialogData.stockBebelandia;
        }
        if($scope.ngDialogData.stockLibertador.idProducto !== null && $scope.ngDialogData.stockLibertador.cantidad){
            $scope.sendWrapper.stockLibertador = $scope.ngDialogData.stockLibertador;
        }
        $distribute = distribucionService.add($scope.sendWrapper);
        $distribute.then(function (datos) {
            if(datos.status === 200){
                ngDialog.closeAll();
            }
        });
    };


    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});
