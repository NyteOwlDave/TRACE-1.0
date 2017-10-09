
/*

  SphereModule.js

  Purpose:  Sphere Object Functionality
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('SphereModule.js')

const Sphere = {
  Intersect: function(o,ray) {
    const data = o.Data
    let t
    let B, C, D
    B = 2 *
    ((ray.Direction.X * (ray.Origin.X - data.Center.X)) +
     (ray.Direction.Y * (ray.Origin.Y - data.Center.Y)) +
     (ray.Direction.Z * (ray.Origin.Z - data.Center.Z)))
    C = Scalar.SQUARE(ray.Origin.X - data.Center.X) +
        Scalar.SQUARE(ray.Origin.Y - data.Center.Y) +
        Scalar.SQUARE(ray.Origin.Z - data.Center.Z) -
        data.Radius2
    D = Scalar.SQUARE(B) - 4 * C
    if (D <= Constants.EPSILON) return 0
    D = Math.sqrt(D)
    t = (-B - D) * 0.5
    if (t > Constants.EPSILON) return t
    t = (-B + D) * 0.5
    if (t > Constants.EPSILON) return t
    return 0
  },
  Normal: function(o,pt) {
    const data = o.Data
    const Normal = {}
    Vec.Sub(pt, data.Center, Normal)
    Vec.Normalize(Normal, Normal)
    return Normal
  }
}

