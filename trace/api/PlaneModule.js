
/*

  PlaneModule.js

  Purpose:  Plane Object Functionality
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('PlaneModule.js')

const Plane = {
  Intersect: function(o,ray) {
    const data = o.Data
    const Vd = Vec.Dot(data.Normal, ray.Direction)
    if (Vd <= Constants.EPSILON) return 0
    let Vo = Vec.Dot(data.Normal, ray.Origin)
    Vo = -(Vo + data.Distance)
    const t = Vo / Vd
    return ((t < 0) ? 0 : t)
  },
  Normal: function(o,pt) {
    return Vec.Clone(o.Data.Normal)
  }
}

