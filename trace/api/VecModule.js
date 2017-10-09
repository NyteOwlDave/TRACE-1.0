
/*

  VecModule.js

  Purpose:  Vector Math Functionality
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('VecModule.js')

const Vec = {
  Fix: function(v) {
    return (v?v:StructFactory.VECTOR(0,0,0))
  },
  Make: function(x,y,z,v) {
    v.X = x
    v.Y = y
    v.Z = z
  },
  Clear: function(v) {
    v.X = 0
    v.Y = 0
    v.Z = 0
  },
  Copy: function(a,b) {
    b.X = a.X
    b.Y = a.Y
    b.Z = a.Z
  },
  Clone: function(a) {
    a = Vec.Fix(a)
    return {
      X : a.X,
      Y : a.Y,
      Z : a.Z
    }
  },
  Add: function(a,b,c) {
    c.X = a.X + b.X
    c.Y = a.Y + b.Y
    c.Z = a.Z + b.Z
  },
  Sub: function(a,b,c) {
    c.X = a.X - b.X
    c.Y = a.Y - b.Y
    c.Z = a.Z - b.Z
  },
  Negate: function(a,b) {
    b.X = -a.X
    b.Y = -a.Y
    b.Z = -a.Z
  },
  Scale: function(a,k,b) {
    b.X = k * a.X
    b.Y = k * a.Y
    b.Z = k * a.Z
  },
  Project: function(a,ka,b,c) {
    c.X = ka * a.X + b.X
    c.Y = ka * a.Y + b.Y
    c.Z = ka * a.Z + b.Z
  },
  Combine: function(a,ka,b,kb,c) {
    c.X = ka * a.X + kb * b.X
    c.Y = ka * a.Y + kb * b.Y
    c.Z = ka * a.Z + kb * b.Z
  },
  Dot: function(a,b,n) {
    const d = (
      a.X*b.X +
      a.Y*b.Y +
      a.Z*b.Z
    )
    if (Array.isArray(n)) {
      n.push(d)
    }
    return d
  },
  Cross: function(a,b,c) {
    c.X = a.Y * b.Z - a.Z * b.Y
    c.Y = a.Z * b.X - a.X * b.Z
    c.Z = a.X * b.Y - a.Y * b.X
  },
  Length: function(a,n) {
    const l = Math.sqrt(Vec.Dot(a,a))
    if (Array.isArray(n)) {
      n.push(l)
    }
    return l
  },
  Normalize: function(a,b) {
    const d = Vec.Dot(a,a)
    if (d > 1e-8) {
      const l = Math.sqrt(d)
      Vec.Scale(a, 1/l, a)
      return l
    }
    else {
      a.X = 1
      a.Y = 0
      a.Z = 0
      return 1
    }
  }
}

