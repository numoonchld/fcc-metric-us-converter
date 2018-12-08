/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  const retardUnits = ['gal','lbs','mi'];
  const saneUnits = ['L','Kg','Km'];
  const spellUnits = {
    'gal': 'gallons',
    'lbs': 'pounds',
    'mi': 'miles',
    'L': 'litres',
    'Kg': 'kilograms',
    'Km': 'kilometers'    
  }
  
  // parse query string and return input number in float:
  this.getNum = function(input) {
    
    var result;
    
    // console.log('pre',input);
    
    result = input.substring(0,input.search(/[a-zA-Z]/));
    
    if ( typeof(result) === 'string' && result.length == 0 ) {
      
      // no input number only unit
      result = 1;      
      
    } else if ( parseFloat(result) != result && result.match(/\//g).length == 1 ) { 
      
      // fraction input, single fraction:
      result = result.split('/').reduce( (a,b) => parseFloat(a)/parseFloat(b) );
    
    } else if ( parseFloat(result) != result && result.match(/\//g).length >= 2 ) { 
      
      // fraction input, double or more fraction:
      result = 'invalid number';
      
    } else if ( parseFloat(result) == result && result.indexOf('/') == -1 ) { 
      
      // no fraction, decimal 
      result = parseFloat(result);
    
    } else {
      
      
      result = null;
    
    }

    return result;
    
  };
  
  // parse query string and return input units string:
  this.getUnit = function(input) {
    var result;
    result = input.substring(input.search(/[a-zA-Z]/));
    return result;
  };
  
  // analyse query units and return corresponding other units string:
  this.getReturnUnit = function(initUnit) {
    
    var result;
    
    if (retardUnits.indexOf(initUnit) != -1) {
      
      // query in retard units:
      result = saneUnits[retardUnits.indexOf(initUnit)];
      
    } else if (saneUnits.indexOf(initUnit) != -1) {
      
      // query in sane units:
      result = retardUnits[saneUnits.indexOf(initUnit)];
      
    } else {
      
      result = 'invalid unit';
      
    };
    
    return result;
    
  };

  // expand given unit contraction:
  this.spellOutUnit = function(unit) {
    
    var result;
    result = spellUnits[unit];
    return result;
    
  };
  
  // returns number in other units:
  this.convert = function(initNum, initUnit) {
    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    var result;
    
    switch (initUnit) { 
        
      case 'gal':
        result = parseFloat((initNum * galToL).toFixed(5));
        break;
      case 'lbs':
        result = parseFloat((initNum * lbsToKg).toFixed(5));
        break;
      case 'mi':
        result = parseFloat((initNum * miToKm).toFixed(5));
        break;
      case 'L':
        result = parseFloat((initNum / galToL).toFixed(5));
        break;
      case 'Kg': 
        result = parseFloat((initNum / lbsToKg).toFixed(5));
        break;
      case 'Km':
        result = parseFloat((initNum / miToKm).toFixed(5));
        break;
      default: 
        result = null
                    
                    }

    return result; 
      
    } 

  // returns a description of the unit converison of query:
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
