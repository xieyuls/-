/**
 * Created by Xieyu on 2016/11/14.
 */
var myApp=angular.module("stundentInfo",['ui.router','ngResource','ui.bootstrap']);
myApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("name");
    $stateProvider
        .state('all', {
            url: '/all',
            templateUrl: 'tpls/name.html',
            controller: "AppController"
        })
        .state('name', {
            url: '/name',
            templateUrl: 'tpls/name.html',
            controller: "AppController"
        })
        .state('id', {
            url: '/id',
            templateUrl: 'tpls/name.html',
            controller: "AppController"
        })
        .state('major', {
            url: '/major',
            templateUrl: 'tpls/name.html',
            controller: "AppController"
        })


}]);
myApp.controller("AppController",function($scope,appService,$state){
    $scope.lists=appService.get();
    //        增加新条目
    $scope.add=function(){
        appService.add($scope.name,$scope.id,$scope.major);
    };
    $scope.delete=function(index){
        appService.delete(index);
    };
    $scope.edit=function(index){
        $scope.lists[index].isChange=true;
    };
    $scope.change=function(index){
        appService.set(index,$scope.lists[index].name,$scope.lists[index].id,$scope.lists[index].major,false);
    }
   $scope.go=function(statement){
       // var lists=[{name:"b",id:2},{name:"a",id:4}];
       var lists=appService.get();
       var compare=function(a,b){
           if(statement=="id"){
                if(a.id>b.id) return 1;
                else if(a.id<b.id) return -1;
                else return 0;
           }
           if(statement=="name"){
               if(a.name>b.name) return 1;
               else if(a.name<b.name) return -1;
               else return 0;
           }
           if(statement=="major"){
               if(a.major>b.major) return 1;
               else if(a.major<b.major) return -1;
               else return 0;
           }

       }
       lists=lists.sort(compare);
       }
})

myApp.factory("appService",function ($http) {
    var service={};
    var lists=[];
    $http({
        url:'data/test.json',
        method:'GET'
    }).success(function(data,header,config,status){
        lists=data.studentList;
    });
    service.set=function(index,name,id,major,isChange){
        lists[index]={
            "name": name,
            "id": id,
            "major": major,
            "isChange":isChange
        }
    };
    service.get=function(){
        return lists;
    };

    service.add=function(name,id ,major){
        lists.push(
            {
                "name": name,
                "id": id,
                "major": major,
                "isChange":false
            }
        );
    };
    service.delete=function(index){
        lists.splice(index,1);
    }
    return service;
});

