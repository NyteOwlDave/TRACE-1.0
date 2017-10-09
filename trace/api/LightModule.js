
/*

  LightModule.js

  Purpose:  Lighting Functionality
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('LightModule.js')

const Light = {
  // Prepares a shadow feeler ray
  MakeRay: function(light,pt,ray) {
    const data = light.Data
    ray.Origin = Vec.Clone(pt)
    Vec.Sub(data.Center, pt, ray.Direction)
    return Vec.Normalize(ray.Direction, ray.Direction)
  },
  // Determines shadow feeler ray color
  GetColor: function(light,o,ray,t) {
    RayTracer.Stats.ShadwordRays++
    let ShadowObject = Scene.ObjectList
    while (ShadowObject) {
      if (!Object.is(ShadowObject,o)) {
        const tShadow = ShadowObject.Intersect(ShadowObject,ray)
        if ((tShadow > Constants.EPSILON) &&
            (tShadow < t)) {
          RayTracer.Stats.ShadowsHit++
          return StructFactory.COLOR(0,0,0)
        }
      }
      ShadowObject = ShadowObject.Sibling
    }
    RayTracer.Stats.ShadowsMissed++
    return Color.Clone(light.Properties.Color)
  }
}

