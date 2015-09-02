describe('Memory Directive', function() {
  var randomNumbers = [1,2,3,4,5];
  beforeEach(module('Memory', function($provide) {
    $provide.value('randomNumbers', function() { return randomNumbers; });
  }));

  describe('memory directive', function() {
    let $compile, $rootScope, $timeout, $scope;

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
      $compile = _$compile_;
      $timeout = _$timeout_;
      $scope = _$rootScope_.$new();
    }));

    it('should compile with no attributes', function() {
      let directive = $compile(`<memory></memory>`)($scope);
      $scope.$digest();
      expect(directive.children().length).toBe(25);
    });

    it('should create rows * columns items', function() {
      const ROWS = 3, COLUMNS = 6;
      let directive = $compile(`<memory rows="${ROWS}" columns="${COLUMNS}"></memory>`)($scope);
      $scope.$digest();
      expect(directive.children().length).toBe(ROWS * COLUMNS);
    });

    afterEach(function() {
      $scope.$destroy();
    });

    describe('handleCellClick', function() {
      var directive;
      beforeEach(function() {
        $scope.winGame = jasmine.createSpy('winGame');
        $scope.loseGame = jasmine.createSpy('loseGame');
        directive = $compile(`<memory win-game="winGame()" lose-game="loseGame()"></memory>`)($scope);
        $scope.$digest();
      });

      it('should be noop in the initial stage of the game', function() {
        expect(directive.children().eq(0).scope().handleCellClick).toBe(angular.noop);
      });

      describe('after timeout expires', function() {

        beforeEach(function() {
          $timeout.flush();
        });

        it('should NOT be noop', function() {
          expect(directive.children().eq(0).scope().handleCellClick).not.toBe(angular.noop);
        });

        it('should check if a cell is one of the right cells', function() {
          let scope = directive.children().eq(0).scope(),
              selectedCell = scope.cells[randomNumbers[0]];
          scope.handleCellClick(selectedCell);
          scope.$digest();
          expect($scope.loseGame).not.toHaveBeenCalled();
          expect(selectedCell.selected).toBe(true);
        });

        it('should check if a cell is one of the wrong cells', function() {
          let scope = directive.children().eq(0).scope(),
              selectedCell = scope.cells[9];
          scope.handleCellClick(selectedCell);
          scope.$digest();
          expect($scope.loseGame).toHaveBeenCalled();
        });

        it('should check if a cell is one of the wrong cells', function() {
          let scope = directive.children().eq(0).scope();
          randomNumbers
            .forEach(cellNumber => {
              scope.handleCellClick(scope.cells[cellNumber]);
              scope.$digest();
            });
          expect($scope.winGame).toHaveBeenCalled();
        });

        it('should not care what order the cells are clicked', function() {
          let scope = directive.children().eq(0).scope();
          randomNumbers
            .sort(() => Math.random() < 0.5 ? -1 : 1)
            .forEach(cellNumber => {
              scope.handleCellClick(scope.cells[cellNumber]);
              scope.$digest();
            });
          expect($scope.winGame).toHaveBeenCalled();
        });

        it('should stop listening for clicks after the game has been won', function() {
          let scope = directive.children().eq(0).scope();
          randomNumbers
            .sort(() => Math.random() < 0.5 ? -1 : 1)
            .forEach(cellNumber => {
              scope.handleCellClick(scope.cells[cellNumber]);
              scope.$digest();
            });
          expect($scope.winGame).toHaveBeenCalled();
          scope.handleCellClick(scope.cells[12]);
          scope.$digest();
          expect(scope.cells[12].selected).toBe(false);
          expect($scope.loseGame).not.toHaveBeenCalled();
        });
      });
    });
  });
});
