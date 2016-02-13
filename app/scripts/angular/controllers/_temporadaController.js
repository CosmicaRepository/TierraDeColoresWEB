/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('_temporadaController', ['$scope', '_temporadaService', '$rootScope', function ($scope, _temporadaService, $rootScope) {

        $scope.listaTemporadas = function () {
            $scope.temporadas = "";
            $promesa = _temporadaService.getAll();
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $scope.temporadas = datos.data;
                } else {
                    alert("error");
                }
            });
        };

    }]);


