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
      $scope.kwBtnText = 'Select Keyword'
      $scope.argPlaceholder = [];
      $scope.argList = [];
      $scope.setKeyword = function(kw) {
        $scope.argList = [];
        $scope.selectedKewword = kw;
        $scope.kwBtnText = kw;
        $scope.argPlaceholder = $scope.selectedKewword.split('/').slice(2)
        console.log($scope.selectedKewword);
        $scope.argList[0] = $scope.selectedKewword.split('/')[1]
        // if item.split('/').slice(2)
        // $scope.getInsult(url);
      }
      $scope.setArgs = function() {
          let urlEndpoint = $scope.argList.join('/');
          console.log($scope.argList)
          console.log(urlEndpoint);
          let finalUrl = 'https://cors-anywhere.herokuapp.com/https://roastaas.herokuapp.com/' + urlEndpoint;
          console.log(finalUrl);
          $scope.getInsult(finalUrl)
      }

      $scope.getInsult = function(iurl) {
        // let url = 'https://cors-anywhere.herokuapp.com/https://roastaas.herokuapp.com' + $scope.selectedKewword.replace('NAME','Ramu');

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