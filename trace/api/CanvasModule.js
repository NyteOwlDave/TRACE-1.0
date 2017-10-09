
/*

  CanvasModule.js

  Purpose:  Implements a drawing surface or texture
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('CanvasModule.js')

const Canvas = {
  // Folder where image files are located
  Folder: './art',
  // Create texture map object
  TEXMAP: function(name,imgdata) {
    return {
      Name      : name||'TEXMAP',
      Image     : imgdata,
      Buffer    : imgdata.data,
      Width     : imgdata.width,
      Height    : imgdata.height
    }
  },
  // Calculate buffer offset from pixel coords
  CalcOffset: function(tex,x,y) {
    return (4*(tex.Width*y+x))
  },
  // Write as VGA ColorRegister
  PutPixel: function(tex,x,y,c) {
    const i = Canvas.CalcOffset(tex,x,y,c)
    tex.Buffer[i]   = c.Red
    tex.Buffer[i+1] = c.Green
    tex.Buffer[i+2] = c.Blue
    tex.Buffer[i+3] = 255
  },
  // Read as VGA ColorRegister
  GetPixel: function(tex,x,y) {
    const i = Canvas.CalcOffset(tex,x,y)
    const r = tex.Buffer[i]
    const g = tex.Buffer[i+1]
    const b = tex.Buffer[i+2]
    return VGA.ColorRegister(r,g,b)
  },
  // Write as COLOR object (pixel coords)
  PutColor: function(tex,x,y,c) {
    const r = 255 * c.Red
    const g = 255 * c.Green
    const b = 255 * c.Blue
    Canvas.PutPixel(tex,x,y,VGA.ColorRegister(r,g,b))
  },
  // Read as COLOR object (pixel coords)
  GetColor: function(tex,x,y) {
    const i = Canvas.CalcOffset(x,y)
    const scale = 1 / 255
    const r = scale * tex.Buffer[i]
    const g = scale * tex.Buffer[i+1]
    const b = scale * tex.Buffer[i+2]
    return StructFactory.COLOR(r,g,b)
  },
  // Write as COLOR object (texel coords)
  PutTexel: function(tex,u,v,c) {
    const w = tex.Width
    const h = tex.Height
    let x = (u * w) % w
    let y = (v * h) % h
    if (x<0) x += w
    if (y<0) y += h
    Canvas.PutColor(o,x,y,c)
  },
  // Read as COLOR object (texel coords)
  GetTexel: function(tex,u,v) {
    const w = tex.Width
    const h = tex.Height
    let x = (u * w) % w
    let y = (v * h) % h
    if (x<0) x += w
    if (y<0) y += h
    return Canvas.GetColor(tex,x,y)
  },
  // Compose URL from image name
  ComposeURL: function(name) {
    let s = Canvas.Folder
    if (s.substr(s.length-1,1)!=='/') s += '/'
    return (s + name + '.png') 
  },
  // Load HTML img from file, given only name
  // (extension PNG is assumed)
  LoadFromFile: function(name,img) {
    const url = Canvas.ComposeURL(name)
    img.setAttribute('src',url)
  },
  // Load TEXMAP from database, given only name
  // (extension PNG is assumed)
  LoadFromDB: function(name) {
    throw 'This feature not implemented yet'
  },
  // Save TEXMAP to database
  // (extension PNG is assumed)
  SaveToDB: function(tex) {
    throw 'This feature not implemented yet'
  },
  // Capture TEXMAP from HTML img
  Capture: function(name,img) {
    const w = img.width
    const h = img.height
    const cvs = document.createElement('canvas')
    cvs.width  = w
    cvs.height = h
    const gfx = cvs.getContext('2d')
    gfx.drawImage(img,0,0)
    const dat = gfx.getImageData(0,0,w,h)
    return Canvas.TEXMAP(name,dat)
  },
  // Create empty TEXMAP
  Create: function(name,w,h) {
    const cvs = document.createElement('canvas')
    const gfx = cvs.getContext('2d')
    const dat = gfx.createImageData(w,h)
    return Canvas.TEXMAP(name,dat)
  },
  // Fill TEXMAP with R,G,B color
  Fill: function(tex,r,g,b) {
    const w = tex.Width
    const h = tex.Height
    const buf = tex.Buffer
    let x,y,i,j,l,m,n
    for (y=0; y<h; y++) {
      j = y*w
      for (x=0; x<w; x++) {
        k = 4*(j+x)
        buf[k]   = r
        buf[k+1] = g
        buf[k+2] = b
        buf[k+3] = 255
      }      
    }
  }
}

