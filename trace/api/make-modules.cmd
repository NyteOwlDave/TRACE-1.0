@echo off
cls
set TEMPLATE=template-01.js
title Make Modules
echo.
echo Creating Module Files ...
echo.
for %%A in (
CanvasModule
ColorModule
CommandModule
ConstantsModule
ErrorModule
LightModule
ObjectModule
PlaneModule
PrintModule
ScalarModule
SceneModule
SphereModule
StructModule
SurfaceModule
TraceModule
VecModule
VGAModule
) do (
if not exist %%A.js copy %TEMPLATE% %%A.js
)
echo.
echo Updating MODULE.LIST ...
echo.
dir /b /a-d *.js > module.list
echo.
set TEMPLATE=
pause
