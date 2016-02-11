/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('_loginController', function ($scope, _loginService, $location, $rootScope, $cookies, $window, createDialog) {

    $scope.usuario = {username: '', password: ''};
    $scope.go = function (path) {
        $location.path(path);
    };
    $scope.iniciarSesion = function () {
        $promesa = _loginService.getAccess($scope.usuario);
        $promesa.then(function (datos) {
            switch (datos.status) {
                case 200:
                    $cookies.put('render', true);
                    $cookies.putObject('token', datos);
                    $rootScope.render = true;
                    var role = datos.data.role[0].authority;
                    if (role === 'ROLE_ADMIN') {
                        $window.location.href = 'home.html';
                    } else {
                        $window.location.href = 'ventas.html';
                    }
                    break;
                case 401:
                    createDialog({
                        id: 'simpleDialogs',
                        title: datos.data.error,
                        template: datos.data.error_description,
                        backdrop: true
                    });
                    break;
                case 400:
                    createDialog({
                        id: 'simpleDialog',
                        title: datos.data.error,
                        template: datos.data.error_description,
                        backdrop: true
                    });
                    break;
                default:
                    createDialog({
                        id: 'simpleDialog',
                        title: datos.data.error,
                        template: datos.data.error_description,
                        backdrop: true
                    });
            }
        });
    };
});

