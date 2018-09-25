"use Strict";
var app = angular.module("app",["ngTextTruncate"]);

app.controller("mainCtrl", ['$scope', 'Info','socailInfo', function($scope, Info, socailInfo) {

    Info.getInfo().then(function(info) {
        $scope.info = info;
        console.log(info.description);
    })
    socailInfo.getSocailInfo().then(function(sInfo) {
        $scope.sInfo = sInfo;
    })
}])

.factory("Info",["$http", "$q", function($http, $q) {
    var provider = {
        info: null,
        getInfo: function() {
            if(provider.info) return $q.resolve(provider.info);
            return $http.get("https://api.myjson.com/bins/cmizk").then(function(res) {
                provider.info = res.data;
                return provider.info
            });
        }
    };
    return provider;
}])

.factory("socailInfo", ["$http", "$q", function($http,$q) {
    var provider = {
        sInfo:null,
        getSocailInfo: function() {
            if(provider.sInfo) return $q.resolve(provider.sInfo);
            return $http.get("https://api.myjson.com/bins/k27k8").then(function(res) {
                provider.sInfo = res.data;
                return provider.sInfo
            });
        }
    };
    return provider;
}])

.filter('thousandSuffix', function () {
    return function (input, decimals) {
      var exp, rounded,
        suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

      if(window.isNaN(input)) {
        return null;
      }

      if(input < 1000) {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
  })

  .filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + '%';
    };
  }]);