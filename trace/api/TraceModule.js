
/*

  TraceModule.js

  Purpose:  Where the *Magic* Happens
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('TraceModule.js')

const RayTracer = {
  // HTML element from which to dispatch
  // progress report events
  ProgressElement: null,
  // Dispatch a progress report event
  // if ProgressElement is not null
  ReportProgress: function(count,total) {
     const e = RayTracer.ProgressElement
     if (e) {
        const ev = new CustomEvent(
          'progress', 
          { 
            detail: {
              Cancel : false,
              Count  : count,
              Total  : total
            }                
          }
        )
        e.dispatchEvent(ev)
        return ev.detail.Cancel
     }
     return false
  },
  // Set the view properties explicitly
  SetView: function(loc,up,right,fov,aspect) {
    
    const me = RayTracer
    const dir = {}
    
    // Invert up and right vectors
    Vec.Negate(up, up)
    Vec.Negate(right, right)
    // Normalize up and right vectors
    Vec.Normalize(up, up)
    Vec.Normalize(right, right)
    // Determine front vector
    Vec.Cross(up, right, dir)
    // Adjust up vector accordingly
    Vec.Cross(right, dir, up)
    // Convert FOV to radians (divided by 2)
    fov = fov * Math.PI / 360
    // Determine scaling factor for the FOV
    const scale = 1 / Math.tan(fov)
    // Scale up and right vectors, taking into
    // account both FOV and aspect ratio
    Vec.Scale(up, scale, up)
    Vec.Scale(right, aspect * scale, right)

    // Save the new view properties
    me.View = StructFactory.VIEWPOINT(loc,dir,up,right)
    
  },
  // Set the view properties so as to look at a
  // specific point in the scene
  LookAt: function(loc,up,at,fov,aspect) {

    const me = RayTracer
    const front = {}
    const right = {}
    
    // Vec from camera location to target point
    Vec.Sub(at, loc, front)
    // Normalize up and front vectors
    Vec.Normalize(front, front)
    Vec.Normalize(up, up)
    // Calculate right vector
    Vec.Cross(front, up, right)
    // Adjust up vector accordingly
    Vec.Cross(right, front, up)

    // Go set view properties
    me.SetView(loc, up, right, fov, aspect)

  },
  // Setup the display properties and
  // render the entire scene to the specified
  // texture map object
  Screen: function(tex) {

    const me = RayTracer
  
    // Construct new statistics object
    me.Stats = StructFactory.Statistics()

    // Match display size to texture size
    me.Display = StructFactory.DISPLAY(tex.Width,tex.Height)

    // Initialize stats
    me.Stats.StartTracing()
    // Render the scene
    me.Scan(tex)
    // Finalize stats
    me.Stats.StopTracing()

    // Return elapsed time in seconds
    return me.Stats.GetElapsedTime()
    
  },
  // Shoot 1 ray through the center of each
  // display pixel and save the color to the
  // specified texture map object
  Scan: function(tex) {

    const me = RayTracer
    const sx = me.Display
    const ray = StructFactory.RAY()
    const color = StructFactory.COLOR()
  
    // Clear the recursion depth
    me.RecurseLevel = 0

    // Get display dimensions
    const xMax = sx.Width
    const yMax = sx.Height
    
    let x, y

    // For each display row
    for (y=0; y<yMax; y++) {
      // Report progress (exit if cancelled)
      if (me.ReportProgress(y, yMax)) {
        break
      }
      // For each display column
      for (x=0; x<xMax; x++) {
        try {
          me.MakeRay(x, y, ray)
          me.Trace(ray, color)
          Canvas.PutColor(tex, x, y, color)
        }
        catch (err) {
          console.log(err)
        }
      }
    }

    // Do final progress report
    me.ReportProgress(yMax, yMax)
    
  },
  // Create a sample scene
  MakeTestScene: function() {

    const me = RayTracer
    let o,c

    // Init. the scene
    c = StructFactory.COLOR(0,0,0)
    Scene.Initialize(c)

    // Clear the surface stack
    Surface.Stack = []

    // Sphere #1
    c = Color.Parse(Color.Names.Gold)
    o = ObjectFactory.MakeSphere(0, 0, 0, 25)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Sphere #2
    c = Color.Parse(Color.Names.ForestGreen)
    o = ObjectFactory.MakeSphere(-37.5, -30, -15.5, 20)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Sphere #3
    c = Color.Parse(Color.Names.Orange)
    o = ObjectFactory.MakeSphere(52.5, -17.5, -18, 20)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Sphere #4
    c = Color.Parse(Color.Names.Carrot)
    o = ObjectFactory.MakeSphere(-57.5, 12.5, 0, 15)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Sphere #5
    o = ObjectFactory.MakeSphere(12.5, -32.5, -14, 15)
    Surface.SetAttrib(o)

    // Sphere #6
    c = Color.Parse(Color.Names.Purple)
    o = ObjectFactory.MakeSphere(47.5, 17.5, 20, 15)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Sphere #7
    c = Color.Parse(Color.Names.Green)
    o = ObjectFactory.MakeSphere(-32.5, 32.5, 35, 15)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Sphere #8
    c = Color.Parse(Color.Names.Gold)
    o = ObjectFactory.MakeSphere(17.5, 30, 47.5, 30)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Sphere #9
    c = Color.Parse(Color.Names.Blue)
    o = ObjectFactory.MakeSphere(62.5, 30, -77.5, 20)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 20, 0.9, 100, 0.65)

    // Plane #1
    c = Color.Parse(Color.Names.MidnightBlue)
    o = ObjectFactory.MakePlane(0, 0, 1, 100)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 1, 0, 0, 0)

    // Plane #2
    c = Color.Parse(Color.Names.Blue) 
    o = ObjectFactory.MakePlane(0, 1, 0, -50)
    Surface.SetAttribNew(o, c, 0.3, 0.7, 1, 0, 0, 1)

    // Light #1
    ObjectFactory.MakeLight(65, -100, -100, 1, 1, 1)

    // Print light list
    Print.List(Scene.LightList)

    // Print object list
    Print.List(Scene.ObjectList)
    
  },
  // Create and test a sample scene
  Test: function(tex) {

    const me = RayTracer
    const up  = {}
    const at  = {}
    const loc = {}

    // Prepare the view
    Vec.Make(0, 80, -500, loc)
    Vec.Make(0, 1, 0, up)
    Vec.Clear(at)
    me.LookAt(loc, up, at, 100, tex.Width / tex.Height)

    // Make test scene
    me.MakeTestScene()

    // Render
    me.Screen(tex)

    // Print statistics
    Print.Stats(me.Stats)

    // Return elapsed time
    return me.Stats.GetElapsedTime()
    
  },
  // Display properties
  Display: {},
  // Camera location and orientation
  View: {},
  // Statistics
  Stats: {},
  // Current recursion depth
  RecurseLevel: 0,
  // Trace the path of a ray in the hopes of hitting
  // some object to add color to the scene
  Trace: function(ray,color) {

    const me = RayTracer
    let P = StructFactory.VECTOR()
    let N = StructFactory.VECTOR()
    let t, MinT, NormalDir
    let MinObject
    let TheObject

    // Keep track of max recursion depth
    if (me.Stats.MaxDepth < me.RecurseLevel) {
        me.Stats.MaxDepth = me.RecurseLevel
    }

    // Default color to black
    Color.Make(0,0,0,color)

    // Avoid excessive recursion
    if (me.RecurseLevel > Constants.MAXRECURSELEVEL) { return }

    // Update stats
    me.Stats.TotalRays++

    // Prepare to locate nearest object
    MinT = Constants.BIG
    MinObject = null
    TheObject = Scene.ObjectList
    
    // Walk the object list and locate nearest object
    // that the ray intersects
    while (TheObject) {

      // Check for intersection...
      t = TheObject.Intersect(TheObject, ray)
      
      // Hit and nearest so far? Keep track!
      if ((t > Constants.EPSILON) && (t < MinT)) {
          MinT = t
          MinObject = TheObject
      }

      // Move to next object
      TheObject = TheObject.Sibling

    }

    // No objects hit?
    if (Constants.BIG === MinT) {
      // Read background color
      Scene.BackGround.GetColor(ray.Direction, color)
      me.Stats.ObjectsMissed++   // Update stats
      return
    }

    // Update stats
    me.Stats.ObjectsHit++

    // Calculate point of intersection
    P.X = MinT * ray.Direction.X + ray.Origin.X
    P.Y = MinT * ray.Direction.Y + ray.Origin.Y
    P.Z = MinT * ray.Direction.Z + ray.Origin.Z

    // Calculate surface normal at the POI
    N = MinObject.Normal(MinObject, P)
    
    // Force normal to always point back toward
    // the ray's origin
    NormalDir = Vec.Dot(N, ray.Direction)
    if (NormalDir > 0) {
      Vec.Negate(N, N)
    }

    // Determine color at the POI
    me.Shade(MinObject, ray, N, P, color)

  },
  // Determine ray color at point of intersection
  // (deals with lighting/shadows also)
  Shade: function(o,ray,normal,pt,color) {

    const me = RayTracer
    const LightRay = StructFactory.RAY()
    const ReflectedRay = StructFactory.RAY()
    const srf = o.Properties

    let K, amb, diff, spec, t
    let LightSource
    let LightColor
    
    // Compute reflected ray
    K = Vec.Dot(ray.Direction, normal)
    K *= -2
    ReflectedRay.Origin = pt
    ReflectedRay.Direction.X = K * normal.X + ray.Direction.X
    ReflectedRay.Direction.Y = K * normal.Y + ray.Direction.Y
    ReflectedRay.Direction.Z = K * normal.Z + ray.Direction.Z

    // Deal with ambient light first
    amb = o.Properties.Ambient
    color.Red   = amb * srf.Color.Red
    color.Green = amb * srf.Color.Green
    color.Blue  = amb * srf.Color.Blue

    // Loop through all light sources
    LightSource = Scene.LightList
    while (LightSource) {

      // Compute ray to the light source
      t = Light.MakeRay(LightSource, pt, LightRay)
      
      // Shoot shadow feeler ray at light source
      LightColor = Light.GetColor(LightSource, o, LightRay, t)
      
      // Deal with diffuse light
      diff = Vec.Dot(normal, LightRay.Direction)
      if ((diff > 0) && (srf.Diffuse > 0)) {
        diff = ( 
            srf.Diffuse *
            Math.pow(diff, srf.Brilliance)
        )
        color.Red   += (diff * LightColor.Red   * srf.Color.Red  )
        color.Green += (diff * LightColor.Green * srf.Color.Green)
        color.Blue  += (diff * LightColor.Blue  * srf.Color.Blue )
      }

      // Deal with specular light
      spec = Vec.Dot(ReflectedRay.Direction, LightRay.Direction)
      if ((spec > 0) && (srf.Specular > 0)) {
        spec = (
          srf.Specular * 
          Math.pow(spec, srf.Roughness)
        )
        color.Red   += (spec * LightColor.Red  )
        color.Green += (spec * LightColor.Green)
        color.Blue  += (spec * LightColor.Blue )
      }

      // Next light source
      LightSource = LightSource.Sibling

    }

    // Shoot reflected ray
    K = srf.Reflection
    if (K > 0) {
      const NewColor = StructFactory.COLOR()
      me.Stats.ReflectedRays += 1
      me.RecurseLevel += 1
      me.Trace(ReflectedRay, NewColor)
      color.Red   += (K * NewColor.Red  )
      color.Green += (K * NewColor.Green)
      color.Blue  += (K * NewColor.Blue )
      me.RecurseLevel -= 1
    }
  },
  // Prepare a ray shot through the center
  // of a pixel in canvas space
  MakeRay: function(x,y,ray) {

    const me = RayTracer
    const sc = me.Display
    const vw = me.View
  
    let ScrnY, ScrnX
    const TempV1 = {}
    const TempV2 = {}
    
    // Transform to normalized screen coords
    // centered and having range [-0.5 ... +0.5]
    ScrnX = (x - sc.WHalf + 0.5) * sc.WInv
    ScrnY = (
      ((sc.Height - 0.5 - y) -
       (sc.HHalf)) * sc.HInv
    )

    // Calculate the ray's direction in view space
    Vec.Scale(vw.Up, ScrnY, TempV1)
    Vec.Scale(vw.Right, ScrnX, TempV2)
    Vec.Add(TempV1, TempV2, ray.Direction)
    Vec.Add(vw.Direction, ray.Direction, ray.Direction)
    Vec.Normalize(ray.Direction, ray.Direction)

    // Set the ray's origin
    ray.Origin.X = vw.Location.X
    ray.Origin.Y = vw.Location.Y
    ray.Origin.Z = vw.Location.Z
  }  
}

