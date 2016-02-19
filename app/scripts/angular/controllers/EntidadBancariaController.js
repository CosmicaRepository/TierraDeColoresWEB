/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('EntidadBancariaController', function ($scope, entidadBancariaService) {


    $scope._entidadBancaria = {
        "idEntidadMonetaria": null,
        "nombreEntidad": "",
        "direccionEntidad": "",
        "telefonoEntidad": "",
        "estadoEntidad": true,
        "fechaCreaciion": "",
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null
    };
    
    $scope.listaEntidadBancaria = function (){
        $scope.entidadBancarias = "";
        $promesa = entidadBancariaService.getAll();
        $promesa.then(function (datos){
            $scope.entidadBancarias = datos.data;
        });
    };

});

