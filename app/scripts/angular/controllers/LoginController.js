/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('LoginController', function ($scope, toaster, LoginService, $location, $rootScope, $cookies, $window, createDialog) {

    $scope.usuario = {username: '', password: ''};
    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.iniciarSesion = function () {
        $promesa = LoginService.getAccess($scope.usuario);
        $promesa.then(function (datos) {
            switch (datos.status) {
                case 200:
                    $cookies.put('render', true);
                    $cookies.putObject('token', datos);
                    $cookies.put('a_tk', datos.data.access_token);
                    $rootScope.render = true;
                    var role = datos.data.role[0].authority;
                    if (role === 'ROLE_ADMIN') {
                        $window.location.href = 'home.html';
                    } else {
                        $window.location.href = 'ventas.html';
                    }
                    break;
                case 401:
                    toaster.pop('error', "Error", "No tienes autorizacion para ingresar.");
                    break;
                case 400:
                    toaster.pop('error', "Error", "Contraseña y/o usuario incorrectos.");
                    break;
                default:
                    toaster.pop('error', "Error", "¡Op's algo paso!, comunicate con el administrador");
            }
        });
    };
});

