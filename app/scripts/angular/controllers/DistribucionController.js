/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('DistribucionController', function ($scope, NgTableParams, toaster, $timeout, facturaProductoService, $state, $stateParams, distribucionService) {


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

});

