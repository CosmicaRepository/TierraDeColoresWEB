/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('_categoriaController', ['$scope', 'ngTableParams', 'createDialog', '$route', '$timeout', '$cookies', 'Upload', '$location', '_categoriaService', 'factoryCache', '$rootScope', function ($scope, ngTableParams, createDialog, $route, $timeout, $cookies, Upload, $location, _categoriaService, factoryCache, $rootScope) {

        $scope._categoria = {
            "idCategoria": null,
            "nombreCategoria": "",
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": "",
            "fechaModificacion": null
        };

        $scope.listaCategorias = function () {
            $scope.categorias = "";
            $promesa = _categoriaService.getListaCategorias();
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $scope.categorias = datos.data;
                } else {
                    alert("error");
                }
            });
        };

        $scope.agrearCategoria = function (categoria) {
            $promesa = _categoriaService.addCategoria(categoria);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };

        $scope.eliminarCategoria = function (categoria) {
            $promesa = _categoriaService.deleteCategoria(categoria);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };
        
        $scope.seleccionarCategoria = function (categoria){
            $scope.__categoria = categoria;
        };

        $scope._modificarCategoria = function (categoria){
            $promesa = _categoriaService.updateCategoria(categoria);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };
        
    }]);

