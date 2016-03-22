/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.directive('title', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            link: function () {
                var listener = function (event, toState) {
                    $timeout(function () {
                        $rootScope.title = (toState.data && toState.data.pageTitle)
                                ? toState.data.pageTitle
                                : 'Default title';
                    });
                };
                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);