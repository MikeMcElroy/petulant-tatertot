angular.module('Memory')
  .controller('MemoryGame', ['$scope', function($scope) {
    $scope.winGame = function() {
      $scope.message = 'Congratulations!';
    };

    $scope.loseGame = function() {
      $scope.message = 'Boohoo!';
    };

    $scope.playAgain = function() {
      $scope.message = null;
      $scope.$broadcast('playAgain');
    };

    $scope.message = null;
  }]);
