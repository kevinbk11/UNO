const InitGameRequest = require('./InitGameRequest')
const ThrowCardRequest = require('./ThrowCardRequest')
const DrawOneCardRequest = require('./DrawOneCardRequest')
const ChoiceColorRespond = require('./ChoiceColorRespond')
const UnoRequest = require('./UnoRequest')
const ReadyRequest = require('./ReadyRequest')
const RestartRequest = require('./RestartRequest')
const ExitRequest = require('../MainPageEvents/ExitRequest')
requests=[
    InitGameRequest,
    ThrowCardRequest,
    DrawOneCardRequest,
    ChoiceColorRespond,
    UnoRequest,
    ReadyRequest,
    RestartRequest,
]
module.exports= requests