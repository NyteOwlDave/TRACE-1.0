
/*

  ObjectModule.js

  Purpose:  Geometric Object Factory
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('ObjectModule.js')

const ObjectFactory = {
  MakeSphere: function(x,y,z,radius) {
    const type = StructFactory.ObjectType.Sphere
    const sphere = StructFactory.AnObject(type)
    sphere.Print = (function(o) {
      Print.Sphere(o)
    })
    sphere.Intersect = (function(o,ray) {
      return Sphere.Intersect(o,ray)
    })
    sphere.Normal = (function(o,pt) {
      return Sphere.Normal(o,pt)
    })
    const pt = {}
    Vec.Make(x,y,z,pt)    
    sphere.Data = StructFactory.ASphere(pt,radius)
    Scene.AddObject(sphere)
    return sphere
  },
  MakePlane: function(a,b,c,d) {
    const type = StructFactory.ObjectType.Plane
    const plane = StructFactory.AnObject(type)
    plane.Print = (function(o) {
      Print.Plane(o)
    })
    plane.Intersect = (function(o,ray) {
      return Plane.Intersect(o,ray)
    })
    plane.Normal = (function(o,pt) {
      return Plane.Normal(o,pt)
    })
    const pt = {}
    Vec.Make(a,b,c,pt)    
    plane.Data = StructFactory.APlane(pt,d)
    Scene.AddObject(plane)
    return plane
  },
  MakeLight: function(x,y,z,r,g,b) {
    const type = StructFactory.ObjectType.Light
    const light = StructFactory.AnObject(type)
    light.Print = (function(o) {
      Print.Light(o)
    })
    const pt = {}
    Vec.Make(x,y,z,pt)    
    light.Data = StructFactory.ALight(pt)
    const color = StructFactory.COLOR(r,g,b)
    Surface.SetAttribNew(light,color,1,0,0,0,0,0)
    Scene.AddLight(light)
    return light
  }
}

