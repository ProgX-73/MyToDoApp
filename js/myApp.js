app = angular.module('myApp', []);

app.controller('eventController', function ($rootScope) {
    
     $rootScope.$on('updateDetail',function(event, data){
        
         alert("by ROOT");
         //relai de com!
        $rootScope.$broadcast('updateDetail',event, data);
        
    });
});
    
app.controller('listController', function ($scope, TodoService) {

   
   
    $scope.titre = "Hello World !!!";

    $scope.go = function (m) {

       var todo = TodoService.find(m);
       $scope.$emit('updateDetail',todo);
        
    };
    
    
    $scope.todos = TodoService.findAll();

   
});


app.controller('navController', function ($scope) {

    $scope.hash = "2a0983ec57054ee1d0277dc8bda17cb9.png?s=28";
});

app.controller('detailController', function ($scope, TodoService) {

    $scope.sel = "Loading ...";
    $scope.$on('updateDetail',function(event, data){
        
        $scope.sel = data;
        alert("updated");
    });
    
    
});


app.factory('TodoService', function () {

   var manager = {
    selection : {},
    find : function(id){
        
        this.selection =  this.todos[id];
        return this.todos[id];},
    findAll : function(){return this.todos;},
    todos : [
            {
                "id": 0,
                "titre": "Matin",
                "tache": "se lever",
                "user": "fred",
                date_enr: "2014-04-21",
                date_max: "2014-04-23"
        },
            {
                "id": 1,
                "titre": "AM",
                "tache": "courir",
                "user": "fred",
                date_enr: "2014-04-25",
                date_max: "2014-04-25"
        },
            {
                "id": 2,
                "titre": "PM",
                "tache": "ramer",
                "user": "oliv",
                date_enr: "2014-04-23",
                date_max: "2014-04-29"
        }

    ]}
            return manager;
    
    
    });
    