angular.module('starter.services', [])

    .factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
});