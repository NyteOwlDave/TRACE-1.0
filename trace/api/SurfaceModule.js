
/*

  SurfaceModule.js

  Purpose:  Surface Material Functionality
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('SurfaceModule.js')

const Surface = {
  SURFACE: function(c,amb,diff,bri,spec,rough,refl) {
    return {
      Color       : Color.Clone(c),
      Ambient     : amb?amb:0,
      Diffuse     : diff?diff:0,
      Brilliance  : bri?bri:0,
      Specular    : spec?spec:0,
      Roughness   : rough?rough:0,
      Reflection  : refl?refl:0
    }
  },
  SetAttrib: function(o) {
    o.Properties = Surface.Peek()
    if (!o.Properties) {
      const c = StructFactory.COLOR(1,1,0.12)
      Surface.PushAttribNew(c,1)
      o.Properties = Surface.Peek()
    }
    return o.Properties
  },
  SetAttribNew: function(o,c,amb,diff,bri,spec,rough,refl) {
    Surface.PushAttribNew(c,amb,diff,bri,spec,rough,refl)
    return Surface.SetAttrib(o)
  },
  PushAttrib: function(srf) {
      return Surface.Stack.push(srf)
  },
  PushAttribNew: function(c,amb,diff,bri,spec,rough,refl) {
      const srf = Surface.SURFACE(
        c,amb,diff,bri,spec,rough,refl
      )
      return Surface.PushAttrib(srf)
  },
  Stack: [],
  GetCount: function() {
    return Surface.Stack.length
  },
  Peek: function() {
    const n = Surface.GetCount()
    if (n<1) {
      return null
    }
    else {
      return Surface.Stack[n-1]
    }
  }
}

