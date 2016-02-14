/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('ProveedorController', function ($scope, $http, $routeParams, ngTableParams, createDialog, $route, $timeout, $cookies, $location, _proveedorService) {

    $scope._proveedor = {
        "idProveedor": null,
        "nombreProveedor": "",
        "cuitProveedor": "",
        "direccionProveedor": "",
        "paisProveedor": "",
        "provinciaProveedor": "",
        "localidadProveedor": "",
        "codigoPostal": "",
        "telefonoProveedor": "",
        "emailProveedor": "",
        "estadoProveedor": true,
        "usuarioCreacion": 1,
        "usuarioModificacion": null,
        "fechaCreacion": "",
        "fechaModificacion": null
    };

    $scope.listaProveedores = function () {
        $scope.proveedores = "";
        $promesa = _proveedorService.getAll();
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $scope.proveedores = datos.data;
            } else {
                alert("error");
            }
        });
    };

    $scope.agrearProveedor = function (proveedor) {
        $promesa = _proveedorService.add(proveedor);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    $scope.eliminarProveedor = function (proveedor) {
        $promesa = _proveedorService.delete(proveedor);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    $scope.seleccionarProveedor = function (proveedor) {
        $scope.__proveedor = proveedor;
    };

    $scope._modificarProveedor = function (proveedor) {
        console.log(proveedor);
        $promesa = _proveedorService.update(proveedor);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    $scope.buscarProveedor = function () {
        var idProveedor = $routeParams.idProveedor;
        $promesa = _proveedorService.searchById(idProveedor);
        $promesa.then(function (datos) {
            console.log(datos);
            if (datos.status !== 200 || datos.data.estadoProveedor === false) {
                $location.path("/proveedores");
            } else {
                $scope.foundProveedor = datos.data;
            }
        });
    };

    $scope.selectProveedorConf = {
        mode: 'object',
        id: 'idProveedor',
        text: 'nombreProveedor',
        options: function (searchText) {
            var token = $cookies.getObject('token');
            return $http({
                url: 'http://localhost:8080/proveedor/searchText',
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token.data.access_token
                },
                params: {
                    'text': searchText
                }
            });
        },
        select2: {
            minimumInputLength: 2
        }
    };


});

