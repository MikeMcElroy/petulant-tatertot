angular.module('Memory')
  .constant('SHOW_CELL_TIME', 5000)
  .directive('memory', function() {
    return {
      replace: true,
      restrict: 'E',
      scope: { loseGame: '&', winGame: '&' },
      template: `<div class="game" ng-style="{ 'width': columns * 4 + 1 + 'rem'}"><div class="cell" ng-class="{'selected': cell.selected}" ng-click="handleCellClick(cell)" ng-repeat="cell in cells">{{cell.id}}</div></div>`,
      controller: ['$scope', '$timeout', 'SHOW_CELL_TIME', 'Cell', 'randomNumbers', function($scope, $timeout, SHOW_CELL_TIME, Cell, randomNumbers) {
        $scope.initializeGame = function(rows = 5, cols = 5) {
          $scope.cells = new Array(rows * cols);
          let len = $scope.cells.length;
          for (let i = 0; i < len; i++) {
            $scope.cells[i] = Cell(i + 1);
          }

          $scope.columns = cols;
        };

        $scope.handleCellClick = angular.noop;

        $scope.startGame = function(selectable = 5) {
          $scope.cells.forEach(cell => cell.selected = false);
          let selectedCells = randomNumbers($scope.cells.length, selectable);

          selectedCells.forEach(cell => $scope.cells[cell].selected = true);
          $scope.clickable = false;

          /**
           * A naive handling of cell clicks might have allowed for $scope inspection
           * to find the selectedCells.  This keeps the selected cells locked away as
           * private state within this closure and not sitting out in the open on the
           * $scope.
           */
          let countOfClickedCells = 0;
          let handleCellClick = function(cell) {
            if (selectedCells.some(cellNumber => $scope.cells[cellNumber].id === cell.id)) {
              cell.selected = !cell.selected;
            } else {
              $scope.loseGame();
              $scope.handleCellClick = angular.noop;
            }

            countOfClickedCells += cell.selected ? 1 : -1;
            if (countOfClickedCells === selectable) {
              $scope.winGame();
              $scope.handleCellClick = angular.noop;
            }
          };

          $timeout(() => {
            selectedCells.forEach(cell => $scope.cells[cell].selected = false);
            $scope.handleCellClick = handleCellClick;
          }, SHOW_CELL_TIME);
        };
      }],

      link: function($scope, $element, $attrs) {
        $scope.columns = $attrs.columns;

        let rows = parseInt($attrs.rows, 10) || 5;
        let cols = parseInt($attrs.columns, 10) || 5;
        let selectable = parseInt($attrs.selectable, 10) || 5;
        $scope.initializeGame(rows, cols);
        $scope.startGame(selectable);

        $scope.$on('playAgain', () => $scope.startGame(selectable));
      },
    };
  });
