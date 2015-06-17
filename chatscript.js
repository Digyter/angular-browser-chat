    var chat = angular.module('chat', ['ngRoute', 'firebase']);

    chat.config(function($provide, $routeProvider) {
        $routeProvider

            .when('//', {
                templateUrl : 'login.html',
                controller  : 'loginController'
            })

            .when('/chat/:room', {
                templateUrl : 'chat.html',
                controller  : 'chatController'
            });

        $provide.factory('currsession', function() {
            var username = "";
            var room = "";
            
            return {
                getUsername: function() {
                    return username;
                },
                setUsername: function(value) {
                    username = value;
                },
                getRoom: function() {
                    return room;
                },
                setRoom: function(value) {
                    room = value;
                }
            }
        });

        $provide.factory('Message', ['$firebase', function($firebase) {
            var ref = new Firebase('https://chattify.firebaseio.com');
            var messages = $firebase(ref.child('messages')).$asArray();

            var Message = {
                all: messages,
                create: function (message) {
                    return messages.$add(message);
                },
                get: function (messageId) {
                    return $firebase(ref.child('messages').child(messageId)).$asObject();
                },
                delete: function (message) {
                    return messages.$remove(message);
                }
            };

            return Message;
        }]);

    });

    chat.controller('chatController', ['$scope', 'Message', 'currsession', '$location', function($scope, Message, currsession, $location){

            if (currsession.getUsername() == "" || currsession.getRoom == "") {
                $location.url("/");    
                return;
            };
            $scope.name=currsession.getUsername();
            $scope.room=currsession.getRoom();
            $scope.messages= Message.all;

            $scope.send = function(message){
                message.user = currsession.getUsername();
                message.room = currsession.getRoom();
                Message.create(message);
            };
    }]);

    chat.controller('loginController', function($scope, currsession, $location) {            
        $scope.doLogin = function(){
            currsession.setUsername($scope.user);
            currsession.setRoom($scope.room);
            $location.url("chat/"+$scope.room);
            return;
        };
    });