app = angular.module('myApp',[]);

app.controller('listController',function($scope){
    
    $scope.titre = "Hello World !!!";
    
    $scope.todos = [ 
        { "id" : 0, "titre":"Matin", "tache":"se lever", date_enr :"2014-04-21", date_max:"2014-04-23"},
        { "id" : 1, "titre":"AM", "tache":"courir", date_enr :"2014-04-25", date_max:"2014-04-25"},
        { "id" : 2, "titre":"PM", "tache":"ramer", date_enr :"2014-04-23", date_max:"2014-04-29"}
           
    ]
    
});


app.controller('navController',function($scope){
    
    $scope.hash ="2a0983ec57054ee1d0277dc8bda17cb9.png?s=28";
});

app.controller('detailController',function($scope,TodoService){
    
    var luke = new TodoService('Luke');
    $scope.detail  = luke.speak();

});


app.factory('TodoService', function() {
  var TodoClass = function(user) {
    this.name = user;
    this.speak = function () {
      return 'liste des todos  ' + this.name;
    };
    this.datas =  [ 
        { "id" : 0, "titre":"Matin", "tache":"se lever", date_enr :"2014-04-21", date_max:"2014-04-23"},
        { "id" : 1, "titre":"AM", "tache":"courir", date_enr :"2014-04-25", date_max:"2014-04-25"},
        { "id" : 2, "titre":"PM", "tache":"ramer", date_enr :"2014-04-23", date_max:"2014-04-29"}
           
    ]
  }
  return TodoClass;
});
 
