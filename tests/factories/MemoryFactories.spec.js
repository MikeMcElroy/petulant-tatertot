describe('Memory Factories', function() {
  beforeEach(module('Memory'));

  describe('Cell', function() {
    let Cell;
    beforeEach(inject(function(_Cell_) {
      Cell = _Cell_;
    }));

    it('should take an ID and place it on the ID property of the returned object', function() {
      let cell = Cell(1);
      expect(cell.id).toBe(1);
    });

    it('should add a selected property which defaults to false', function() {
      let cell = Cell(1);
      expect(cell.selected).toBe(false);
    });
  });

  describe('randomNumbers', function() {
    let randomNumbers;
    beforeEach(inject(function(_randomNumbers_) {
      randomNumbers = _randomNumbers_;
    }));

    it('should return an array', function() {
      let numbers = randomNumbers(15, 5);

      expect(numbers).toEqual(jasmine.any(Array));
    });

    it('should throw an error if used nonsensically', function() {
      expect(() => randomNumbers()).toThrow();
      expect(() => randumNumbers(0)).toThrow();
      expect(() => randomNumbers('truthy')).toThrow();
      expect(() => randomNumbers(10, -1)).toThrow();
      expect(() => randomNumbers(10, 'truthy')).toThrow();
    });

    it('should choose N numbers between 0 and {max}', function() {
      expect(randomNumbers(10, 3).length).toBe(3);
    });

    it('should choose distinct numbers', function() {
      expect(randomNumbers(10, 10).length).toBe(10);
      expect(randomNumbers(10, 10).sort()).toEqual([0,1,2,3,4,5,6,7,8,9]);
    });
  });
});
