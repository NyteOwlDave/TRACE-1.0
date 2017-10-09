
/*

  SceneModule.js

  Purpose:  Scene Management
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('SceneModule.js')

const Scene = {
  BackGround: {},
  ObjectList: null,
  LightList: null,
  AddObject: function(o) {
    o.Sibling = Scene.ObjectList
    Scene.ObjectList = o
  },
  AddLight: function(o) {
    o.Sibling = Scene.LightList
    Scene.LightList = o
  },
  ClearObjectList: function() {
    let o = Scene.ObjectList
    while (o) {
      Scene.ObjectList = o.Sibling
      o.Sibling = null
      o = Scene.ObjectList
    }
  },
  ClearLightList: function() {
    let o = Scene.LightList
    while (o) {
      Scene.LightList = o.Sibling
      o.Sibling = null
      o = Scene.LightList
    }
  },
  Clear: function() {
    Scene.ClearObjectList()
    Scene.ClearLightList()
  },
  GetObjectCount: function() {
    let count = 0
    let o = Scene.ObjectList
    while (o) {
      count++
      o = o.Sibling
    }
    return count
  },
  GetLightCount: function() {
    let count = 0
    let o = Scene.LightList
    while (o) {
      count++
      o = o.Sibling
    }
    return count
  },
  Initialize: function(color,palette,up) {
    Scene.BackGround = StructFactory.BACKGROUND(color,palette,up)
    Scene.Clear()
  }
}

