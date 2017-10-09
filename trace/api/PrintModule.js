
/*

  PrintModule.js

  Purpose:  Message Area Functionality
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('PrintModule.js')

const Print = {
  ComposeVec: function(v) {
    return ('<' + v.X + ', ' + v.Y + ', ' + v.Z + '>')
  },
  ComposeColor: function(c) {
    return Print.ComposeVec({
      X: c.Red,
      Y: c.Green,
      Z: c.Blue
    })
  },
  List: function(list) {
    let o = list
    while (o) {
      if (o.Print) {
        o.Print(o)
      }
      o = o.Sibling
    }
  },
  SurfaceAttrib: function(o) {
    const name  = s => Print.Raw(s + ' = ')
    const value = s => Print.Line(s)
    const srf = o.Properties
    value('Surface Attributes:')
    name('Ambient')
    value(srf.Ambient)
    name('Brilliance')
    value(srf.Brilliance)
    name('Color')
    value(ColorCompose(srf.Color))
    name('Diffuse')
    value(srf.Diffuse)
    name('Reflection')
    value(srf.Reflection)
    name('Roughness')
    value(srf.Roughness)
    name('Specular')
    value(srf.Specular)
  },
  Light: function(light) {
    Print.Line(
      'Light centered at ' + 
      Print.ComposeVec(light.Data.Center) +
      ' having color ' + 
      Print.ComposeColor(light.Properties.Color)
    )
  },
  Plane: function(plane) {
    const data = plane.Data
    Print.Line(
      'Plane with normal ' + 
      Print.ComposeVec(data.Normal) +
      ' having distance ' + 
      data.Distance
    )
  },
  Sphere: function(sphere) {
    const data = sphere.Data
    Print.Line(
      'Sphere centered at ' + 
      Print.ComposeVec(data.Center) +
      ' having radius ' +
      data.Radius
    )
  },
  Stats: function(stats) {
    const name  = s => Print.Raw(s + ' => ')
    const value = s => Print.Line(s)
    name('Display Width')
    value(stats.DisplayWidth)
    name('Display Height')
    value(stats.DisplayHeight)
    name('Total Pixels')
    value(stats.GetTotalPixels())
    name('Total Rays')
    value(stats.TotalRays)
    name('Objects Hit')
    value(stats.ObjectsHit)
    name('Objects Missed')
    value(stats.ObjectsMissed)
    name('Reflected Rays')
    value(stats.ReflectedRays)
    name('Refracted Rays')
    value(stats.RefractedRays)
    name('Shadow Rays')
    value(stats.ShadowRays)
    name('Shadows Hit')
    value(stats.ShadowsHit)
    name('Shadows Missed')
    value(stats.ShadowsMissed)
    name('Light Count')
    value(stats.LightCount)
    name('Surface Count')
    value(stats.SurfaceCount)
    name('Object Count')
    value(stats.ObjectCount)
    name('Max Recursion Depth')
    value(stats.MaxDepth)
    name('Start Time')
    value(stats.StartTime)
    name('Stop Time')
    value(stats.StopTime)
    name('Elapsed Time')
    value(stats.GetElapsedTime() + ' second(s)')
  },
  Cache: '',
  Raw: function(s) {
    Print.Cache += s
  },
  Line: function(s) {
    if (Print.Cache.length) {
      console.log(Print.Cache + s)
      Print.Cache = ''
    }
    else {
      console.log(s)
    }
  } 
}

