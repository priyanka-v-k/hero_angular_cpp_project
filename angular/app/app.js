'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', ['ui.bootstrap',
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('appCtrl', function($scope,$uibModal,$http) {
  var heroesList=[{'marvel':[{'Iron Man':346},{'Captain America':149},{'Hawkeye II':314},{'Hulk':332},{'Thor':659}]},{'dc':[{'Batman':70},{'Superman':644},{'Flash II':265},{'Wonder Woman':720},{'Aquaman':38}]}];
  var preSelectedKey='marvel',selectedKey;
  var token='2701365683253405/';
  var heroUrl = 'http://localhost:3000';
  $http.defaults.useXDomain = true;
  $scope.searchTerm='';
  $scope.heroesMarvelResponse=[];
  $scope.heroesDCResponse=[];
  console.log("helloooooooooo");
  $scope.searchYourHero=function(){
    console.log("inside ppup");
    var modal=$uibModal.open({
      templateUrl: 'searchPopup.html', //  can specify the CSS class
      keyboard: false, // ESC key close enable/disable
     // backdrop:'static',
      controller:function($uibModal,$uibModalInstance ,$scope,searchResponse,searchTerm){
        $scope.hero={};
        $scope.dataNotAvailable=false;
        $scope.dataAvailable=false;
        $scope.ok = function () {
               $uibModalInstance.dismiss('cancel');
            };
        function init(){
          angular.forEach(searchResponse,function(data,key){
            if(data.data.name===searchTerm){
              $scope.hero=data;
              $scope.dataAvailable=true;
            }
          })
          if(!searchTerm || (searchTerm && Object.keys($scope.hero).length<1)){
             $scope.dataNotAvailable=true;
          }
        }
        init();
       },
      resolve: {
        searchResponse: function () {
              return $scope.heroesMarvelResponse.concat($scope.heroesDCResponse);
          },
          searchTerm : function(){
            return $scope.searchTerm
          }
      } 
  });
};

function init(){
  angular.forEach(heroesList,function(data,key){
    angular.forEach(data,function(hero,comic){
      angular.forEach(hero,function(heroLst,index){
        angular.forEach(heroLst,function(heroId,heroName){
          makeAPICall(heroId);
        });
      });
    });
  });
  
  
}

function makeAPICall(id){
  var req={
    id:'/api/'+token+id
  }
  $http({
    method : "POST",
    url : heroUrl,
    headers: {
      'Content-Type': 'application/JSON'
    },
    data: JSON.stringify(req)
  }).then(function mySuccess(response) {
    if(id === 346 || id === 149|| id === 314|| id === 332|| id === 659){
      $scope.heroesMarvelResponse.push(response);
    }
    else{
      $scope.heroesDCResponse.push(response);
    }
  }, function myError(response) {
    $('.toast').toast('show');
  });
  
}
init();
 
});
