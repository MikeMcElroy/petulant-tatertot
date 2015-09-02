angular.module('Memory')
  .factory('Cell', function() {
    return function(id) {
      var cell = Object.create({});
      Object.assign(cell, { id, selected: false });
      return cell;
    };
  })
  .factory('randomNumbers', function() {
    return function(maximum, numbers = 1) {
      if ((typeof maximum != 'number') || maximum <= 0) {
        throw new TypeError('You must specify a maximum number greater than zero to randomNumbers');
      }

      if ((typeof numbers != 'number') || numbers < 1) {
        throw new TypeError('You must specify the number of random numbers to choose, and that must be greater than 1.');
      }

      let randomNumbers = new Set();
      while (randomNumbers.size < numbers) {
        let rand = Math.floor(Math.random() * maximum);
        if (!randomNumbers.has(rand)) {
          randomNumbers.add(rand);
        }
      }

      return Array.from(randomNumbers);
    };

  });
