<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8"/>
  <title>TRACE 1.0</title>
  <style>
  body {
    color: #beef16;
    background-color:#543210;
  }
  canvas {
    background: black;
    border: 1px solid ochre;
  }
  fieldset {
    width: 482px;
  }
  fieldset, legend, button, input, textarea {
    border-radius: 0.2em;
    padding: 0.2em 0.3em 0.2em 0.3em;
  }
  body,button {
    font: 14pt verdana,tahoma,arial;
  }
  textarea {
    font: 12pt consolas, monospace;
    width: 460px;
    height: 320px;
  }
  </style>
</head>
<body onload="App.start()">
<noscript>
<h2>Sorry!</h2>
<p>Either your browser has JavaScript disabled or
it does not support JavaScript.</p>
</noscript>
<canvas 
width="500" height="400"
id="idCanvas">
<h2>Sorry!</h2>
<p>Your browser does not support the HTML5
canvas element.</p>
</canvas>
<fieldset><legend>Commands</legend>
<div>
<button onclick="App.render()" disabled="true">Render</button>
<button onclick="App.test()">Test</button>
<button onclick="App.clear()">Clear</button>
</div>
</fieldset>
<fieldset><legend>Script Editor</legend>
<div>This feature is incomplete.</div>
<textarea id="idEditor" disabled="true"></textarea>
</fieldset>
</body>
<library>
<script src="api/project.js"></script>
<script src="api/CanvasModule.js"></script>
<script src="api/ColorModule.js"></script>
<script src="api/CommandModule.js"></script>
<script src="api/ConstantsModule.js"></script>
<script src="api/ErrorModule.js"></script>
<script src="api/LightModule.js"></script>
<script src="api/ObjectModule.js"></script>
<script src="api/PlaneModule.js"></script>
<script src="api/PrintModule.js"></script>
<script src="api/ScalarModule.js"></script>
<script src="api/SceneModule.js"></script>
<script src="api/SphereModule.js"></script>
<script src="api/StructModule.js"></script>
<script src="api/SurfaceModule.js"></script>
<script src="api/TraceModule.js"></script>
<script src="api/VecModule.js"></script>
<script src="api/VGAModule.js"></script>
</library>
<application>
<script name="The App Object">
const App = {
  start: function() {
    try {
    }
    catch (err) {
      console.log(err)
      alert(err)
    }
  },
  render: function() {
    try {
      throw "Incomplete!"
    }
    catch (err) {
      console.log(err)
      alert(err)
    }
  },
  test: function() {
    try {
      const buf = App.createFrameBuffer()
      RayTracer.Test(buf)
      App.drawFrameBuffer(buf)
    }
    catch (err) {
      console.log(err)
      alert(err)
    }
  },
  clear: function() {
    try {
      const gfx = idCanvas.getContext('2d')
      gfx.fillStyle = 'black'
      const w = idCanvas.width
      const h = idCanvas.height
      gfx.fillRect(0,0,w,h)
    }
    catch (err) {
      console.log(err)
      alert(err)
    }
  },
  testFill: function() {
    const buf = App.createFrameBuffer()
    Canvas.Fill(buf,50,60,70)
    App.drawFrameBuffer(buf)
  },
  createFrameBuffer: function() {
    const w = idCanvas.width
    const h = idCanvas.height
    return Canvas.Create('FrameBuffer',w,h)
  },
  drawFrameBuffer: function(buffer) {
    const gfx = idCanvas.getContext('2d')
    gfx.putImageData(buffer.Image,0,0)
  }
}
</script>
</application>
</html>
