app = angular.module('myApp',[]);

app.controller('listController',function($scope){
    
    $scope.titre = "Hello World !!!";
    
    $scope.todos = [ 
        { "id" : 0, "titre":"Matin", "tache":"se lever", date_enr :"2014-04-21", date_max:"2014-04-23"},
        { "id" : 1, "titre":"AM", "tache":"courir", date_enr :"2014-04-25", date_max:"2014-04-25"},
        { "id" : 2, "titre":"PM", "tache":"ramer", date_enr :"2014-04-23", date_max:"2014-04-29"}
           
    ]
    
});
