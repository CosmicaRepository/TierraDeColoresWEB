/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.directive('scrollTo', function ($location, $anchorScroll) {
    return function (scope, element, attrs) {
        element.bind('click', function (event) {
            event.stopPropagation();
            scope.$on('$locationChangeStart', function (ev) {
                ev.preventDefault();
            });
            var location = attrs.scrollTo;
            $location.hash(location);
            $anchorScroll();
        });
    };
});

