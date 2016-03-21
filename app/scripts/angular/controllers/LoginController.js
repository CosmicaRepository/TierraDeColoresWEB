/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('LoginController', function ($scope, $timeout, $state, toaster, LoginService, $location, $rootScope, $cookies, $window) {

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
                        $state.transitionTo('home');     
                        $timeout(function timer() {
                            toaster.pop('success', "¡Hola!", "Bienvenido.");
                }, 1000);
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

    $scope.logout = function () {
        $promesa = LoginService.logoutApi();
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $timeout(function timer() {
                    $state.go('login');
                }, 2000);
            }
            toaster.pop('info', "Adios.", "Hasta luego :)");
        });
    };
});

