let faasApp = angular.module('faasApp', []);
// let insultList = [];
let oneInsult = '';

class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }}
  
  


console.log('yoda')
faasApp.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{:');
    $interpolateProvider.endSymbol(':}');
  }]);
faasApp.controller('faasCtrl', ['$scope', '$http', function($scope, $http) {

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
      $scope.insult="";
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
        //   let finalUrl = 'https://cors-anywhere.herokuapp.com/https://roastaas.herokuapp.com/' + urlEndpoint;
          let finalUrl = 'https://roastaas.herokuapp.com/' + urlEndpoint;
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
              $scope.insult = response.data.insult
              oneInsult = response.data.insult
              console.log(response.data.insult);
            //   insultList.push(response.data.insult);
            //   console.log("from sc", insultList);
            $('.insultRow').removeClass('d-none')
            
            
              window.scatterText();
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
                console.log('err', response);
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
      }
}]);

$( document ).ready(function() {
    console.log( "ready!" );

    // ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————


  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————
  window.scatterText = function() {
  const phrases = [oneInsult, oneInsult];
  $('html, body').animate({
    scrollTop: $(".insultCnt").offset().top
}, 2000);
  
  
  const el = document.querySelector('.itext');
  const fx = new TextScramble(el);
  
  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
  };
  
  next();

  }


});