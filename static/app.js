let faasApp = angular.module('faasApp', []);

console.log('yoda')
faasApp.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{:');
    $interpolateProvider.endSymbol(':}');
  }]);
faasApp.controller('faasCtrl', ['$scope', '$http', function($scope, $http) {
    // $scope.ele = ['1','3'];
    // console.log($scope.ele);
    $scope.keywords = [
        '/zero/NAME',
        '/anyway/NAME',
        '/awesome',
        '/asshole',
        '/backoff/NAME',
        '/ballmercompany/COMPANY/NAME',
        '/bag',
        '/bday/NAME',
        '/blackadder/NAME',
        '/bravo/NAME',
        '/why',
        '/bucket',
        '/bye',
        '/bus/NAME',
        '/caniuse/TOOL',
        '/chainsaw/NAME',
        '/worthless/NAME',
        '/hyposcritical/NAME',
        '/donut/NAME',
        '/dosomething/DO/SOMETHING',
        '/equity/NAME',
        '/canteven/THING',
        '/fascinating/NAME',
        '/cool',
        '/cup',
        '/chat',
        '/everyone',
        '/everything',
        '/fever/NAME',
        '/keep/NAME',
        '/king/NAME',
        '/foreign/NAME',
        '/look/NAME',
        '/insane/NAME',
        '/nugget/NAME',
        '/outside/NAME',
        '/shakespeare/NAME',
        '/time/NAME',
        '/calm/REACTION',
        '/particular/THING',
        '/language/LANG',
        '/family',
        '/flying',
        '/ftfy',
        '/fts',
        '/holygrail',
        '/immensity',
        '/looking',
        '/maybe',
        '/no',
        '/programmer',
        '/rat',
        '/thumbs'
      ]
      console.log($scope.keywords)
      $scope.selectedKewword = '/Zero/NAME'
      $scope.setKeyword = function(kw) {
        $scope.selectedKewword = kw;
        console.log($scope.selectedKewword);
        let url = 'https://cors-anywhere.herokuapp.com/https://roastaas.herokuapp.com' + $scope.selectedKewword.replace('NAME','Ramu');
        $scope.getInsult(url);
      }

      $scope.getInsult = function(iurl) {
        $http({
            method: 'GET',
            url: iurl
          }).then(function successCallback(response) {
              console.log(response);
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
                console.log('err', response);
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
      }
}]);