/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('_sexoController', ['$scope', '_sexoService', '$rootScope', function ($scope, _sexoService, $rootScope) {

        $scope.listaSexos = function () {
            $scope.sexos = "";
            $promesa = _sexoService.getAll();
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $scope.sexos = datos.data;
                } else {
                    alert("error");
                }
            });
        };

    }]);

