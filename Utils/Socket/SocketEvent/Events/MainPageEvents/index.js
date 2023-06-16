let VerifyRequest = require('./VerifyRequest')
let CreateRoomRequest = require('./CreateRoomRequest')
let JoinRoomRequest = require('./JoinRoomRequest')
let StartGameRequest = require('./StartGameRequest')
const GetAllRoomRequest = require('./GetAllRoomRequest')
const ExitRequest = require('./ExitRequest')
requests=[
    VerifyRequest,
    CreateRoomRequest,
    JoinRoomRequest,
    StartGameRequest,
    GetAllRoomRequest,
    ExitRequest
]
module.exports= requests