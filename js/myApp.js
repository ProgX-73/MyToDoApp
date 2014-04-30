app = angular.module('myApp', []);
/*********************************************/
/*** CONTROLEUR LISTE DES TODOS ***/
/*********************************************/
app.controller('listController', function ($scope, TodoService, $rootScope) {

    $scope.titre = "Hello World !!!";

    $scope.go = function (m) {

        var todo = TodoService.find(m);

        $rootScope.$broadcast('updateDetail', todo);

    };


    $scope.todos = TodoService.findAll().then(function (datas) {
        $scope.todos = datas;
    }, function (msg) {
        alert(msg);
    });



    $scope.$on('newTodo', function (event, data) {

        // $scope.todos.push(data);
    });

});
/*********************************************/
/*** CONTROLEUR Image gravatar (pour rire) ***/
/*********************************************/
app.controller('navController', function ($scope) {

    $scope.hash = "2a0983ec57054ee1d0277dc8bda17cb9.png?s=28";
});

/*********************************************/
/*** CONTROLEUR DETAIL DU TODO SURVOLE ***/
/*********************************************/
app.controller('detailController', function ($scope, TodoService, $sce) {

    $scope.sel = $sce.trustAsHtml("Loading ...");
    $scope.$on('updateDetail', function (event, data) {

        //Une directive est à réaliser pour cette affichage en template.
        $scope.sel = data; // $sce.trustAsHtml("<p class='panel'> Concerné : " + data.user + "<br> à faire : " + data.tache + "<br> pour le " + data.date_max + "</p>");
    });
});
/*********************************************/
/*** CONTROLEUR AJOUT MODAL ***/
/*********************************************/
app.controller('modalController', function ($scope, TodoService, $rootScope) {
    $scope.tache = [{}];

 
    $scope.appendTache = function () {
        $("#tache").append('<input type="text" name="tache[]" ng-model="tache" placeholder="Tache">');
    }
    $scope.saveTodo = function () {
        //Utilise le service pour enregistrement MongoDB :)
        var todo = {
            "user": "Moi",
            "titre": $scope.titre,
            "color": $scope.color,
            "tache": angular.toJson($scope.tache),
            date_enr: $scope.date_max,
            date_max: $scope.date_max
        }


        console.log(todo.tache);

        TodoService.save(todo).then(
            function (todo) {
                $rootScope.$broadcast('newTodo', todo);
            },
            function (msg) {
                alert(msg);
            }
        );

    };
});

/*************************************************************************/
/*** FACTORY : SERVICE DE COMMUNICATION MONGODB/FOURNISSEUR DES TODOS ***/
/***********************************************************************/
app.factory('TodoService', function ($rootScope, $q) {

    var MongoClient = require('mongodb').MongoClient,
        format = require('util').format;

    that = this;
    var manager = {
        selection: {},
        save: function (todo) {
            //Manipulation des tâches pour transformer les hashkeys sans $
            taches = [];
           alert(todo.tache);
            
            todo.tache = (JSON.parse(todo.tache));
            alert(todo);
            that = this;
            var deferred = $q.defer();
            MongoClient.connect('mongodb://127.0.0.1:27017/todoDB', function (err, db) {
                if (err) deferred.reject('Impossible de se connecter à la base');
                else {
                    var collection = db.collection('todos');
                    collection.insert(todo, function (err, docs) {
                        if (err) deferred.reject('Impossible d\'enregistrer.' + err)
                        else {
                            that.todos.push(todo);
                            deferred.resolve(todo);
                        }
                    });
                }





            });
            return deferred.promise;
            
        },
        find: function (id) {
            var theTodo = {};
            for (var i = 0; i < this.todos.length; i++)
                if (this.todos[i]._id == id) theTodo = this.todos[i];

            return theTodo;
        },
        findAll: function () {


            var deferred = $q.defer();

            MongoClient.connect('mongodb://127.0.0.1:27017/todoDB', function (err, db) {
                if (err) deferred.reject('Impossible de se connecter à la base');
                else {
                    var collection = db.collection('todos');
                    var data = collection.find().sort( { date_max: -1 } ).toArray(function (err, results) {

                        if (err)
                            deferred.reject('Impossible de récupérer les todos.');
                        else
                        if (results.length > 0) {
                            console.log(results);
                            manager.todos = results;
                            deferred.resolve(manager.todos);
                        }
                    });

                }



            });


            return deferred.promise;
        },
        todos: [

    ]
    }






    return manager;


});