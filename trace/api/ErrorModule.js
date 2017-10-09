
/*

  ErrorModule.js

  Purpose:  Error Codes
  Author:   Dave Wellsted, NCS
  Updated:  2017-OCT-07
  
*/

Project.register('ErrorModule.js')

const Error = {
  CompletionCode: {
    NoError         : 0,
    EBadParms       : 1,
    EFileNotFound   : 2,
    EOpeningFile    : 3,
    EReadFileHdr    : 4,
    ENotPCXFile     : 5,
    ECorrupt        : 6,
    EWrtFileHdr     : 7,
    EReadScanLine   : 8,
    EWrtScanLine    : 9,
    EPCCFile        : 10,
    EGraphics       : 11,
    ENoMemory       : 12,
    EWrtExtPal      : 13,
    ENotGIFFile     : 14,
    EReadRowNum     : 15,
    EReadData       : 16
  },
  CompletionMsg: {
    '0'  : 'No error',
    '1'  : 'Bad parameters',
    '2'  : 'File not found',
    '3'  : 'Failed to open file',
    '4'  : 'Failed to read file header',
    '5'  : 'File is not in PCX format',
    '6'  : 'File is corrupt',
    '7'  : 'Failed to write file header',
    '8'  : 'Failed to read scanline',
    '9'  : 'Failed to write scanline',
    '10' : 'PCC file format not supported',
    '11' : 'Graphics function failed',
    '12' : 'Out of memory',
    '13' : 'Failed to write extended palette',
    '14' : 'File is not in GIF format',
    '15' : 'Failed to read row number',
    '16' : 'Failed to read file data'
  }
}

