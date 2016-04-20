/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FiscalController', function ($scope, $state, $stateParams, fiscalService, $cookies) {


    $scope.accesoFiscal = function () {
        var tk = $cookies.get('ptk');
        if (angular.isUndefined(tk)) {
            $printer = fiscalService.printer();
            $printer.then(function (datos) {
                if (datos.status === 200) {
                    $cookies.put('ptk', datos.data.access_token);
                    $scope.printer = false;
                } else {
                    $scope.printer = true;
                }
            });
        } else {
            $printerState = fiscalService.connection();
            $printerState.then(function (datos) {
                if (datos.status !== 200) {
                    $scope.printer = true;
                    $printer = fiscalService.printer();
                    $printer.then(function (datos) {
                        if (datos.status === 200) {
                            $cookies.put('ptk', datos.data.access_token);
                            $scope.printer = false;
                        } else {
                            $scope.printer = true;
                        }
                    });
                } else {
                    $scope.printer = false;
                }
            });
        }
    };

});

