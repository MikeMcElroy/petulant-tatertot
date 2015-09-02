describe('Memory Controller', function() {
  beforeEach(module('Memory'));

  var $controller, $scope;
  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    _$controller_('MemoryGame', {$scope: $scope});
  }));

  afterEach(function() {
    $scope.$destroy();
  });

  it('should set the message to "congratulations" when winGame() is called', function() {
    expect($scope.message).toBeNull();
    $scope.winGame();
    expect($scope.message).toBe('Congratulations!');
  });

  it('should set the message to "boohoo!" when loseGame() is called', function() {
    expect($scope.message).toBeNull();
    $scope.loseGame();
    expect($scope.message).toBe('Boohoo!');
  });

  it('should reset the message and broadcast a "playAgain" event when playAgain is called', function() {
    $scope.winGame();
    expect($scope.message).not.toBeNull();
    let playAgainSpy = jasmine.createSpy('playAgain');

    $scope.$on('playAgain', playAgainSpy);
    $scope.playAgain();

    expect(playAgainSpy).toHaveBeenCalled();
    expect($scope.message).toBeNull();
  });
});
