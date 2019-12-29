'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope,$http,$q) {

  var heroesList=[{'marvel':[{'Iron Man':346},{'Captain America':149},{'Hawkeye II':314},{'Hulk':332},{'Thor':659}]},{'dc':[{'Batman':70},{'Superman':644},{'Flash II':265},{'Wonder Woman':720},{'Aquaman':38}]}];
  var preSelectedKey='marvel',selectedKey;
  var token='2701365683253405/';
  $scope.selectedValfromList1='Iron Man';
  $scope.selectedValfromList2='Captain America';
  $scope.heroesList1=['Iron Man','Captain America','Hawkeye II','Hulk','Thor','Batman','Superman','Flash II','Wonder Woman','Aquaman'];
  $scope.heroesList2=['Iron Man','Captain America','Hawkeye II','Hulk','Thor','Batman','Superman','Flash II','Wonder Woman','Aquaman'];
  var heroUrl = 'http://localhost:3000';
  $http.defaults.useXDomain = true;
  var heroesMarvelPowerStats=[];
  var heroesDCPowerStats=[];
  var promise = $q.all(null);
  $scope.heroesMarvelResponse=[];
  $scope.heroesDCResponse=[];

  
  
  $scope.changeHero=function(hero,heroVal){
    if(hero === 'hero1'){
      $scope.selectedValfromList1 = heroVal;
    }else{
      $scope.selectedValfromList2 = heroVal;
    }
    formBattle();
  }
  
  function formBattle(){
    var heroesResList=$scope.heroesMarvelResponse.concat($scope.heroesDCResponse),
        hero1List=[],hero2List=[];
    angular.forEach(heroesResList,function(data,key){
      if(data.data.name===$scope.selectedValfromList1){
        hero1List.push(parseInt(data.data.powerstats.intelligence),parseInt(data.data.powerstats.strength),parseInt(data.data.powerstats.speed),parseInt(data.data.powerstats.durability),parseInt(data.data.powerstats.power),parseInt(data.data.powerstats.combat));
      }else if(data.data.name===$scope.selectedValfromList2){
        hero2List.push(parseInt(data.data.powerstats.intelligence),parseInt(data.data.powerstats.strength),parseInt(data.data.powerstats.speed),parseInt(data.data.powerstats.durability),parseInt(data.data.powerstats.power),parseInt(data.data.powerstats.combat));
      }
    });
    plotGraph($scope.selectedValfromList1,hero1List,$scope.selectedValfromList2,hero2List,true);
  }
  function init(){
    $scope.dataLoaded=false;
    loopThroughHeroesList();  
  }
  function sumPowerStats(heroesResList){
    var intelli=0,strength=0,combat=0,power=0,speed=0,durability=0,statList=[];
    angular.forEach(heroesResList, function(data,key){
      intelli+=parseInt(data.data.powerstats.intelligence);
      strength+=parseInt(data.data.powerstats.strength);
      speed+=parseInt(data.data.powerstats.speed);
      durability+=parseInt(data.data.powerstats.durability);
      power+=parseInt(data.data.powerstats.power);
      combat+=parseInt(data.data.powerstats.combat);
});
      statList.push(intelli,strength,speed,durability,power,combat);
      return statList;
  }
  function loopThroughHeroesList(){
    angular.forEach(heroesList,function(data,key){
      angular.forEach(data,function(hero,comic){
        angular.forEach(hero,function(heroLst,index){
          angular.forEach(heroLst,function(heroId,heroName){
            var req={
              id:'/api/'+token+heroId
            }
            promise = promise.then(function(){
              return $http({
                method : "POST",
                url : heroUrl,
                headers: {
                  'Content-Type': 'application/JSON'
                },
                data: JSON.stringify(req)
            }).then(function mySuccess(response) {
              if(heroId === 346 || heroId === 149|| heroId === 314|| heroId === 332|| heroId === 659){
                $scope.heroesMarvelResponse.push(response);
              }
              else{
                $scope.heroesDCResponse.push(response);
              }
            }, function myError(response) {
              $('.toast').toast('show');
            });
          })
          })
        })
      })
    })
    promise.then(function(){
      heroesMarvelPowerStats=sumPowerStats($scope.heroesMarvelResponse);
      heroesDCPowerStats=sumPowerStats($scope.heroesDCResponse);
      $scope.dataLoaded=true;
      plotGraph('Marvel',heroesMarvelPowerStats,'DC',heroesDCPowerStats);
      $scope.changeHero('hero1',$scope.selectedValfromList1);
      
    });
  }
  
  function plotGraph(marvelName,marvelLst,DcName,DcLst,batteFlag){
    var marvel = {
      x: ['Intelligence', 'Strength', 'Speed','Durability' , 'Power','Combat'],
      y: marvelLst,
      name: marvelName,
      type: 'bar',
      marker: {
        color: 'rgb(236,29,36)',
      }
    };
    
    var dc = {
      x: ['Intelligence', 'Strength', 'Speed','Durability' , 'Power','Combat'],
      y: DcLst,
      name: DcName,
      type: 'bar',
      marker: {
        color: 'rgb(49,130,189)',
      }
    };
    
    var data = [dc,marvel];
    
    var layout = {
      barmode: 'group',
      autosize: true
      };
    if(batteFlag){
      layout.title= '<span style="font-style:italic;color:gray" >'+$scope.selectedValfromList1+' Vs '+$scope.selectedValfromList2+'</span>';
      Plotly.newPlot('battleDiv', data, layout,{displayModeBar: false});
    }else{
      Plotly.title= '<span style="font-style:italic;color:gray" >Considering the heroes in this page</span>';
      Plotly.newPlot('myDiv', data, layout,{displayModeBar: false,responsive: true});
    }
    
    
  }
  init();

 


  
  
});