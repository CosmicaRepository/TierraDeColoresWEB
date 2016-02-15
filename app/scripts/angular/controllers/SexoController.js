/**
 * Controlador para el objeto Sexo encargado de traer objetos de genero para
 * el registro de nuevos productos
 * @param {type} param1
 * @param {type} param2
 */
miAppHome.controller('SexoController', function ($scope, _sexoService, $rootScope) {

    /**
     * Funcion lista sexos encargada de enlistar los generos disponibles en la
     * base de datos.
     * @returns {undefined}
     */
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

});

