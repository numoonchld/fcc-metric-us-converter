/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  // test number extraction from input string:
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '10.8km';
      assert.equal(convertHandler.getNum(input),10.8);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '4/3km';
      assert.equal(convertHandler.getNum(input).toFixed(5),1.33333);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '22.314/7lbs';
      assert.equal(convertHandler.getNum(input).toFixed(5),3.18771);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '11/33/21/7Kg';
      assert.equal(convertHandler.getNum(input),'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'kg';
      assert.equal(convertHandler.getNum(input),1);
      done();
    }); 
    
  });
  
  // test units extraction from input string:
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var validUnits = ['gal','L','mi','km','lbs','kg'];
      
      
      input.forEach( function(ele) {
          
        if (validUnits.indexOf(ele) == -1) {
          assert.notInclude(validUnits, convertHandler.getUnit(ele));
        } else {
          assert.include(validUnits, convertHandler.getUnit(ele));
        }
        
      });
      
      done();
      
    });
     
    test('Unknown Unit Input', function(done) {
      
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var validUnits = ['gal','L','mi','km','lbs','kg'];
      
      for (var unit in input) {
        
        if (validUnits.indexOf(unit) == -1) {
          assert.notInclude(validUnits, convertHandler.getUnit(unit));
        } else {
          assert.include(validUnits, convertHandler.getUnit(unit));
        }
        
      }

      done();
    });  
    
  });
  
  // test unit transformation:
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','Km','lbs','Kg'];
      var expect = ['L','gal','Km','mi','Kg','lbs'];
      
      input.forEach(function(ele, i) {
        assert.equal(expect[i],convertHandler.getReturnUnit(ele) );
      });
      
      done();
    });
    
  });  
  
  // test expand unit shoftform:
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gal','L','mi','Km','lbs','Kg'];
      var expect = ['gallons','litres','miles','kilometers','pounds','kilograms'];
      
      input.forEach(function(ele, i) {
        assert.equal(expect[i],convertHandler.spellOutUnit(ele));
      });
      
      done();
    });

    
  });
  
  // the magnitude conversion check:   
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [15, 'L'];
      var expected = 3.9625;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [55, 'mi'];
      var expected = 88.5139;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [3, 'Km'];
      var expected = 1.8641;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [15, 'lbs'];
      var expected = 6.8038;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'Kg'];
      var expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
  });

});