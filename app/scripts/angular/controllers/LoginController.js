/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('LoginController',
        function ($scope, $timeout, $state, toaster, LoginService, $location, $rootScope, $cookies, $window) {

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
                            } else {
                                if (role === 'ROLE_VENDEDOR') {
                                    $state.transitionTo('ventas');
                                }
                            }
                            $timeout(function timer() {
                                toaster.pop({
                                    type: 'success',
                                    title: '¡Hola!',
                                    body: 'Bienvenido',
                                    showCloseButton: false
                                });
                            }, 1000);
                            break;
                        case 401:
                            toaster.pop({
                                type: 'error',
                                title: 'Error',
                                body: 'No tienes autorizacion para ingresar.',
                                showCloseButton: false
                            });
                            break;
                        case 400:
                            toaster.pop({
                                type: 'error',
                                title: 'Error',
                                body: 'Contraseña y/o usuario incorrectos.',
                                showCloseButton: false
                            });
                            break;
                        default:
                            toaster.pop({
                                type: 'error',
                                title: 'Error',
                                body: "¡Op's algo paso!, comunicate con el administrador.",
                                showCloseButton: false
                            });
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
                    toaster.pop({
                        type: 'info',
                        title: 'Adios',
                        body: 'Hasta luego :)',
                        showCloseButton: false
                    });
                });
            };

            $scope.back = function () {
                if ($rootScope.previousState !== "") {
                    $state.go($rootScope.previousState);
                } else {
                    $state.go('login.bar');
                }
            };
        });

