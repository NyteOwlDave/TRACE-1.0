
/*

  StructModule.js

  Purpose:  Factory for Classes and Structures
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('StructModule.js')

const Delegates = {
  ThrowUndefined: function(name) {
    throw 'Delegates.' + name + ' is undefined'
  },
  IntersectObject: function(o,ray) {
    Delegates.ThrowUndefined('IntersectObject')
  },
  NormalObject: function(o,pt) {
    Delegates.ThrowUndefined('NormalObject')
  },
  PrintObject: function(o) {
    Delegates.ThrowUndefined('PrintObject')
  }
}

const StructFactory = {
  VECTOR: function(x,y,z) {
    return {
      X: x?x:0,
      Y: y?y:0,
      Z: z?z:0
    }
  },
  COLOR: function(r,g,b) {
    return {
      Red   : r?r:0,
      Green : g?g:0,
      Blue  : b?b:0,
      Clamp: function() {
        this.Red   = Scalar.MID(0, this.Red,   1)
        this.Green = Scalar.MID(0, this.Green, 1)
        this.Blue  = Scalar.MID(0, this.Blue,  1)
      },
      GetHtmlColor: function() {
        const c = this.GetVGAColor()
        const n = (
          (c.Red<<16)  +
          (c.Green<<8) +
          (c.Blue)
        )
        let s = n.toString(16)
        while (s.length < 6) { s = ('0' + s) }
        return ('#' + s)
      },
      SetHtmlColor: function(c) {
        const n = parseInt(c.substr(1),16)
        const r = 0xFF & (n>>16)
        const g = 0xFF & (n>>8)
        const b = 0xFF & (n)
        VGA.Scale(r,g,b,1.0/255,this)
      },
      GetVGAColor: function() {
        const c = VGA.ColorRegister()
        VGA.Scale(
          this.Red,
          this.Green,
          this.Blue,
          255,
          c
        )
        return c
      },
      SetVGAColor: function(c) {
        VGA.Scale(
          c.Red,
          c.Green,
          c.Blue,
          1.0/255,
          this
        )
      }
    }
  },
  RAY: function(o,n) {
    if (n) Vec.Normalize(n,n)
    return {
      Origin    : Vec.Clone(o),
      Direction : Vec.Clone(n)
    }
  },
  VIEWPOINT: function(loc,dir,up,right) {
    Vec.Normalize(dir,dir)
    return {
      Location  : Vec.Clone(loc),
      Direction : Vec.Clone(dir),
      Up        : Vec.Clone(up),
      Right     : Vec.Clone(right)
    }
  },
  DISPLAY: function(w,h) {
    w = Scalar.MID(16,w,Constants.MAXSCREENWIDTH)
    h = Scalar.MID(16,h,Constants.MAXSCREENHEIGHT)
    return {
      Width  : w,
      Height : h,
      WHalf  : 0.5 * w,
      HHalf  : 0.5 * h,
      WInv   : 1 / w,
      HInv   : 1 / h,
      Make   : function(o,w,h) {
        o.Width  = w
        o.Height = h
        o.Calc(o)
      },
      Calc   : function(o) {
        o.WHalf = 0.5 * o.Width
        o.HHalf = 0.5 * o.Height
        o.WInv = 1 / o.Width
        o.HInv = 1 / o.Width
      }
    }
  },
  BACKGROUND: function(color,palette,up) {
    return {
      Colors      : palette?palette:null,
      Up          : Vec.Clone(up),
      SolidColor  : color?color:(StructFactory.COLOR(0,0,0)),
      GetColor    : function(n) {
        if (this.Colors) {
          return (this.Colors.Entry[n])
        }
        else {
          return (this.SolidColor)
        }
      }
    }
  },
  ASphere: function(c,r) {
    r=r?r:1
    return {
      Center  : Vec.Clone(c),
      Radius  : r,
      Radius2 : Scalar.SQUARE(r)
    }
  },
  APlane: function(n,d) {
    if (n) Vec.Normalize(n,n)
    return {
      Normal   : Vec.Clone(n),
      Distance : -d
    }
  },
  ALight: function(c) {
    return {
      Center: Vec.Clone(c)
    }
  },
  ObjectType: {
    NotAnObject : 0,
    Light       : 1,
    Sphere      : 2,
    Plane       : 3,
    Quadric     : 4, // TODO...
    Quartic     : 5, // TODO...
    Cone        : 6, // TODO...
    Ring        : 7, // TODO...
    Patch       : 8, // TODO...
    Polygon     : 9  // TODO...
  },
  AnObject: function(type) {
    return {
      Sibling    : null,
      Type       : (type?type:StructFactory.ObjectType.NotAnObject),
      Properties : null,
      Data       : null,
      Intersect  : null,
      Normal     : null,
      Print      : null
    }
  },
  Statistics: function() {
    return {
      DisplayWidth    : 0,
      DisplayHeight   : 0,
      ReflectedRays   : 0,
      RefractedRays   : 0,
      ObjectsHit      : 0,
      ObjectsMissed   : 0,
      TotalRays       : 0,
      MaxDepth        : 0,
      ShadowsHit      : 0,
      ShadowsMissed   : 0,
      ShadowRays      : 0,
      ObjectCount     : 0,
      SurfaceCount    : 0,
      LightCount      : 0,
      StartTime       : 0,
      StopTime        : 0,
      StartTracing    : function() {
        this.DisplayWidth = RayTracer.Display.Width
        this.DisplayHeight = RayTracer.Display.Height
        this.LightCount = Scene.GetLightCount()
        this.ObjectCount = Scene.GetObjectCount()
        this.SurfaceCount = Surface.Stack.length
        this.StartTime = Date.now()
      },
      StopTracing     : function() {
        this.StopTime = Date.now()
      },
      GetElapsedTime  : function() {
        return (
          0.001 *
          (this.StopTime - this.StartTime)
        )
      },
      GetTotalPixels  : function() {
        return (
          this.DisplayWidth * 
          this.DisplayHeight
        )
      }
    }
  }
}

