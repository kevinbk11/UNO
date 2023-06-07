let VerifyRequest = require('./VerifyRequest')
let CreateRoomRequest = require('./CreateRoomRequest')
let JoinRoomRequest = require('./JoinRoomRequest')
let StartGameRequest = require('./StartGameRequest')
const GetAllRoomRequest = require('./GetAllRoomRequest')
requests=[
    VerifyRequest,
    CreateRoomRequest,
    JoinRoomRequest,
    StartGameRequest,
    GetAllRoomRequest
]
module.exports= requests