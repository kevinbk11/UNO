const InitGameRequest = require('./InitGameRequest')
const ThrowCardRequest = require('./ThrowCardRequest')
const DrawOneCardRequest = require('./DrawOneCardRequest')
const ChoiceColorRespond = require('./ChoiceColorRespond')
const UnoRequest = require('./UnoRequest')
const ReadyRequest = require('./ReadyRequest')
requests=[
    InitGameRequest,
    ThrowCardRequest,
    DrawOneCardRequest,
    ChoiceColorRespond,
    UnoRequest,
    ReadyRequest
]
module.exports= requests