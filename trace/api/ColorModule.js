
/*

  ColorModule.js

  Purpose:  Color management
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('ColorModule.js')

const Color = {
  Names: {
AntiqueWhite        : '0.9804 0.9216 0.8431',
Azure               : '0.9412 1.0000 1.0000',
Bisque              : '1.0000 0.8941 0.7686',
BlanchedAlmond      : '1.0000 0.9216 0.8039',
Cornsilk            : '1.0000 0.9725 0.8627',
EggShell            : '0.9900 0.9000 0.7900',
FloralWhite         : '1.0000 0.9804 0.9412',
Gainsboro           : '0.8627 0.8627 0.8627',
GhostWhite          : '0.9725 0.9725 1.0000',
HoneyDew            : '0.9412 1.0000 0.9412',
Ivory               : '1.0000 1.0000 0.9412',
Lavender            : '0.9020 0.9020 0.9804',
LavenderBlush       : '1.0000 0.9412 0.9804',
LemonChiffon        : '1.0000 0.9804 0.8039',
Linen               : '0.9804 0.9412 0.9020',
MintCream           : '0.9608 1.0000 0.9804',
MistyRose           : '1.0000 0.8941 0.8824',
Moccasin            : '1.0000 0.8941 0.7098',
NavajoWhite         : '1.0000 0.8706 0.6784',
OldLace             : '0.9922 0.9608 0.9020',
PapayaWhip          : '1.0000 0.9373 0.8353',
PeachPuff           : '1.0000 0.8549 0.7255',
SeaShell            : '1.0000 0.9608 0.9333',
Snow                : '1.0000 0.9804 0.9804',
Thistle             : '0.8471 0.7490 0.8471',
TitaniumWhite       : '0.9900 1.0000 0.9400',
Wheat               : '0.9608 0.8706 0.7020',
White               : '1.0000 1.0000 1.0000',
WhiteSmoke          : '0.9608 0.9608 0.9608',
ZincWhite           : '0.9900 0.9700 1.0000',
ColdGrey            : '0.5000 0.5400 0.5300',
DimGray             : '0.4118 0.4118 0.4118',
Gray                : '0.7529 0.7529 0.7529',
LightGray           : '0.8275 0.8275 0.8275',
SlateGray           : '0.4392 0.5020 0.5647',
SlateGrayDark       : '0.1843 0.3098 0.3098',
SlateGreyLight      : '0.4667 0.5333 0.6000',
WarmGray            : '0.5000 0.5000 0.4100',
Black               : '0.0000 0.0000 0.0000',
IvoryBlack          : '0.1600 0.1400 0.1300',
LampBlack           : '0.1800 0.2800 0.2300',
AlizarinCrimson     : '0.8900 0.1500 0.2100',
Brick               : '0.6100 0.4000 0.1200',
CadmiumDeepRed      : '0.8900 0.0900 0.0500',
Coral               : '1.0000 0.4980 0.3137',
CoralLight          : '0.9412 0.5020 0.5020',
DeppPink            : '1.0000 0.0784 0.5765',
EnglishRed          : '0.8300 0.2400 0.1000',
FireBrick           : '0.6980 0.1333 0.1333',
GeraniumLake        : '0.8900 0.0700 0.1900',
HotPink             : '1.0000 0.4118 0.7059',
IndianRed           : '0.6900 0.0900 0.1200',
LightSalmon         : '1.0000 0.6275 0.4784',
MadderLakeDeep      : '0.8900 0.1800 0.1900',
Maroon              : '0.6902 0.1882 0.3765',
Pink                : '1.0000 0.7529 0.7964',
PinkLight           : '1.0000 0.7137 0.7569',
Raspberry           : '0.5300 0.1500 0.3400',
Red                 : '1.0000 0.0000 0.0000',
RoseMadder          : '0.8900 0.2100 0.2200',
Salmon              : '0.9804 0.5020 0.4471',
Tomato              : '1.0000 0.3882 0.2784',
VenetianRed         : '0.8300 0.1000 0.1200',
Beige               : '0.6400 0.5800 0.5000',
Brown               : '0.5000 0.1647 0.1647',
BrownMadder         : '0.8600 0.1600 0.1600',
BrownOchre          : '0.5300 0.2600 0.1200',
Burlywood           : '0.8706 0.7216 0.5294',
BurntSienna         : '0.5400 0.2100 0.0600',
BurntUmber          : '0.5400 0.2000 0.1400',
Chocolate           : '0.8235 0.4118 0.1176',
DeepOchre           : '0.4500 0.2400 0.1000',
Flesh               : '1.0000 0.4900 0.2500',
FleshOchre          : '1.0000 0.3400 0.1300',
GoldOchre           : '0.7800 0.4700 0.1500',
GreenishUmber       : '1.0000 0.2400 0.0500',
Khaki               : '0.9412 0.9020 0.5490',
KhakiDark           : '0.7412 0.7176 0.4196',
LightBeige          : '0.9608 0.9608 0.8627',
Peru                : '0.8039 0.5216 0.2471',
RosyBrown           : '0.7373 0.5608 0.5608',
RawSienna           : '0.7800 0.3800 0.0800',
RawUmber            : '0.4500 0.2900 0.0700',
Sepia               : '0.3700 0.1500 0.0700',
Sienna              : '0.6275 0.3216 0.1765',
SaddleBrown         : '0.5451 0.2706 0.0745',
SandyBrown          : '0.9569 0.6431 0.3765',
Tan                 : '0.8235 0.7059 0.5490',
VanDykeBrown        : '0.3700 0.1500 0.0200',
CadmiumOrange       : '1.0000 0.3800 0.0100',
CadmiumRedLight     : '1.0000 0.0100 0.0500',
Carrot              : '0.9300 0.5700 0.1300',
DarkOrange          : '1.0000 0.5490 0.0000',
MarsOrange          : '0.5900 0.2700 0.0800',
MarsYellow          : '0.8900 0.4400 0.1000',
Orange              : '1.0000 0.5000 0.0000',
OrangeRed           : '1.0000 0.2706 0.0000',
YellowOchre         : '0.8900 0.5100 0.0900',
AureolineYellow     : '1.0000 0.6600 0.1400',
Banana              : '0.8900 0.8100 0.3400',
CadmiumLemon        : '1.0000 0.8900 0.0100',
CadmiumYellow       : '1.0000 0.6000 0.0700',
CadmiumYellowLight  : '1.0000 0.6900 0.0600',
Gold                : '1.0000 0.8431 0.0000',
Goldenrod           : '0.8549 0.6471 0.1255',
GoldenrodDark       : '0.7216 0.5255 0.0431',
GoldenrodLight      : '0.9804 0.9804 0.8235',
GoldenrodPale       : '0.9333 0.9098 0.6667',
LightGoldenrod      : '0.9333 0.8667 0.5098',
Melon               : '0.8900 0.6600 0.4100',
NaplesYellowDeep    : '1.0000 0.6600 0.0700',
Yellow              : '1.0000 1.0000 0.0000',
YellowLight         : '1.0000 1.0000 0.8784',
Chartreuse          : '0.4980 1.0000 0.0000',
ChromeOxideGreen    : '0.4000 0.5000 0.0800',
CinnabarGreen       : '0.3800 0.7000 0.1600',
CobaltGreen         : '0.2400 0.5700 0.2500',
Emeraldreen         : '0.0000 0.7900 0.3400',
ForestGreen         : '0.1333 0.5451 0.1333',
Green               : '0.0000 1.0000 0.0000',
GreenDark           : '0.0000 0.3922 0.0000',
GreenPale           : '0.5961 0.9843 0.5961',
GreenYellow         : '0.6784 1.0000 0.1843',
LawnGreen           : '0.4863 0.9882 0.0000',
LimeGreen           : '0.1961 0.8039 0.1961',
Mint                : '0.7400 0.9900 0.7900',
Olive               : '0.2300 0.3700 0.1700',
OliveDrab           : '0.4196 0.5569 0.1373',
OliveGrennDark      : '0.3333 0.4196 0.1843',
PermanentGreen      : '0.0400 0.7900 0.1700',
SapGreen            : '0.1900 0.5000 0.0800',
SeaGreen            : '0.1804 0.5451 0.3412',
SeaGreenDark        : '0.5608 0.7373 0.5608',
SeaGreenMedium      : '0.2353 0.7020 0.4431',
SeaGreenLight       : '0.1255 0.6980 0.6667',
SpringGreen         : '0.0000 1.0000 0.4980',
SpringGreenMedium   : '0.0000 0.9804 0.6039',
TerreVerde          : '0.2200 0.3700 0.0600',
ViridianLight       : '0.4300 1.0000 0.4400',
YellowGreen         : '0.6039 0.8039 0.1961',
Aquamarine          : '0.4980 1.0000 0.8314',
AquamarineMedium    : '0.4000 0.8039 0.6667',
Cyan                : '0.0000 1.0000 1.0000',
CyanWhite           : '0.8784 1.0000 1.0000',
Turquoise           : '0.2510 0.8784 0.8157',
TurquoiseDark       : '0.0000 0.8078 0.8196',
TurquoiseMedium     : '0.2824 0.8196 0.8000',
TurquoisePale       : '0.6863 0.9333 0.9333',
AliceBlue           : '0.9412 0.9725 1.0000',
Blue                : '0.0000 0.0000 1.0000',
BlueLight           : '0.6784 0.8471 0.9020',
BlueMedium          : '0.0000 0.0000 0.8039',
Cadet               : '0.3725 0.6196 0.6275',
Cobalt              : '0.2400 0.3500 0.6700',
Cornflower          : '0.3922 0.5843 0.9294',
Cerulean            : '0.0200 0.7200 0.8000',
DodgerBlue          : '0.1176 0.5647 1.0000',
Indigo              : '0.0300 0.1800 0.3300',
ManganeseBlue       : '0.0100 0.6600 0.6200',
MidnightBlue        : '0.0980 0.0980 0.4392',
Navy                : '0.0000 0.0000 0.5020',
Peacock             : '0.2000 0.6300 0.7900',
PowderBlue          : '0.6902 0.8784 0.9020',
RoyalBlue           : '0.2549 0.4110 0.8824',
SlateBlue           : '0.4157 0.3529 0.8039',
SlateBlueDark       : '0.2824 0.2392 0.5451',
SlateBlueLight      : '0.5176 0.4392 1.0000',
SlateBlueMedium     : '0.4824 0.4078 0.9333',
SkyBlue             : '0.5294 0.8078 0.9216',
SkyBlueDeep         : '0.0000 0.7490 1.0000',
SkyBlueLight        : '0.5294 0.8078 0.9804',
SteelBlue           : '0.2745 0.5098 0.7059',
SteelBlueLight      : '0.6902 0.7686 0.8706',
TurquoiseBlue       : '0.0000 0.7800 0.5500',
Ultramarine         : '0.0700 0.0400 0.5600',
BlueViolet          : '0.5412 0.1686 0.8863',
CobaltVioletDeep    : '0.5700 0.1300 0.6200',
Magenta             : '1.0000 0.0000 1.0000',
Orchid              : '0.8549 0.4392 0.8392',
OrchidDark          : '0.6000 0.1961 0.8000',
OrchidMedium        : '0.7294 0.3333 0.8275',
PermanentRedViolet  : '0.8600 0.1500 0.2700',
Plum                : '0.8667 0.6275 0.8667',
Purple              : '0.6275 0.1255 0.9412',
PurpleMedium        : '0.5765 0.4392 0.8588',
UltramarineViolet   : '0.3600 0.1400 0.4300',
Violet              : '0.5600 0.3700 0.6000',
VioletDark          : '0.5804 0.0000 0.8275',
VioletRed           : '0.6157 0.1255 0.5647',
VioletRedMedium     : '0.7804 0.0824 0.5226',
VioletRedPale       : '0.8588 0.4392 0.5769'
  },
  Fix: function(c) {
    return (
      c?c:StructFactory.COLOR(0,0,0)
    )
  },
  Make: function(r,g,b,c) {
    c.Red   = r
    c.Green = g
    c.Blue  = b
  },
  Parse: function(s) {
    const sa = s.split(' ')
    while (sa.length < 3) sa.push('0') 
    const c = StructFactory.COLOR(0,0,0)
    const r = Number.parseFloat(sa[0])
    const g = Number.parseFloat(sa[1])
    const b = Number.parseFloat(sa[2])
    Color.Clamp(r,g,b,c)
    return c
  },
  Compose: function(r,g,b) {
    r = Scalar.MID(0,r,1).toFixed(3)
    g = Scalar.MID(0,g,1).toFixed(3)
    b = Scalar.MID(0,b,1).toFixed(3)
    return ('' + r + ' ' + g + ' ' + b) 
  },
  ComposeVGA: function(r,g,b) {
    r = Math.floor(Scalar.MID(0,255*r,255))
    g = Math.floor(Scalar.MID(0,255*g,255))
    b = Math.floor(Scalar.MID(0,255*b,255))
    return ('' + r + ' ' + g + ' ' + b) 
  },
  ComposeHTML: function(r,g,b) {
    r = Math.floor(Scalar.MID(0,255*r,255))
    g = Math.floor(Scalar.MID(0,255*g,255))
    b = Math.floor(Scalar.MID(0,255*b,255))
    s = ((r<<16)+(g<<8)+b).toString(16)
    while (s.length < 6) s = '0' + s
    return ('#' + s) 
  },
  Clamp: function(r,g,b,color) {
    color.Red   = Scalar.MID(0,r,1).toFixed(4)
    color.Green = Scalar.MID(0,g,1).toFixed(4)
    color.Blue  = Scalar.MID(0,b,1).toFixed(4)
  },
  Clone: function(c) {
    return StructFactory.COLOR(c.Red,c.Green,c.Blue)
  }
}

