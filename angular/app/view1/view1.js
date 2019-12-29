'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

}])

.controller('View1Ctrl', function($scope,$http,$location,$anchorScroll) {
  var heroesList=[{'marvel':[{'Iron Man':346},{'Captain America':149},{'Hawkeye II':314},{'Hulk':332},{'Thor':659}]},{'dc':[{'Batman':70},{'Superman':644},{'Flash II':265},{'Wonder Woman':720},{'Aquaman':38}]}];
  var preSelectedKey='marvel',selectedKey;
  var token='2701365683253405/';
  var heroUrl = 'http://localhost:3000';
  $http.defaults.useXDomain = true;
  $scope.heroesMarvelResponse=[];
  $scope.heroesDCResponse=[];
  
 
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