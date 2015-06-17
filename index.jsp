    <!DOCTYPE html>
    <html ng-app="chat">
    <head>
      
      <script src="/chat/bower_components/angular/angular.js"></script>
      <script src="/chat/bower_components/angular-route/angular-route.js"></script>
      <script src="/chat/bower_components/jquery/dist/jquery.js"></script>
      <script src="/chat/chatscript.js"></script>
      <script src="https://cdn.firebase.com/libs/angularfire/0.9.2/angularfire.min.js"></script>
      <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>

      <link rel="stylesheet" type="text/css" href="/chat/bower_components/bootstrap/css/bootstrap.css" />
    </head>

    <body ng-controller="loginController">
        <div ng-view></div>
    </body>
</html>