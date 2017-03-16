/**
 * Created by Xieyu on 2016/11/7.
 */
var myApp=angular.module('myApp',['ui.router','ngResource'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("all");
        $stateProvider
            .state('all',{
                url:'/all',
                templateUrl:'tpls/rightViewAll.html',
                controller: "listController"
            })
    }])
   .controller('listController',function($scope,$state,dataService){

        $scope.lists=dataService.get();
    //        增加新条目
        $scope.add=function(){
            dataService.add($scope.name,$scope.id,$scope.major);
        };
        $scope.delete=function(index){
            dataService.delete(index);
        };
        $scope.edit=function(index){
            $scope.lists[index].isChange=true;
        };

        $scope.change=function(index){
           dataService.set(index,$scope.lists[index].name,$scope.lists[index].id,$scope.lists[index].major,false);
        }
});

myApp.factory("dataService",function ($http) {
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