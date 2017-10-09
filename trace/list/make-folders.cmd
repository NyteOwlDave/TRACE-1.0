@echo off
cls
title Make Folders
echo.
echo Creating Module Folders ...
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
md %%A
)
echo.
echo Updating FOLDER.LIST ...
echo.
dir /b /ad > folder.list
echo.
pause
