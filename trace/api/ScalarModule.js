
/*

  ScalarModule.js

  Purpose:  Scalar Math Functions
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('ScalarModule.js')

const Scalar = {
  ABS: function(x) {
    return ((x<0)?(-x):(x))
  },
  SGN: function(x) {
    return ((x<0)?(-1):(1))
  },
  SGNZ: function(x) {
    return (
      (x<0) ?
      (-1)  :
      (x>0) ?
      (1)   :
      (0)
    )
  },
  MIN: function(a,b) {
    return Math.min(x)
  },
  MAX: function(a,b) {
    return Math.max(x)
  },
  MID: function(a,b,c) {
    return (Math.min(Math.max(a,b),c))
  },
  SQUARE: function(x) {
    return (x*x)
  },
  CUBE: function(x) {
    return (x*x*x)
  }
}

