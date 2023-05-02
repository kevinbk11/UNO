let VerifyRequest = require('./Events/VerifyRequest')
let CreateRoomRequest = require('./Events/CreateRoomRequest')
let JoinRoomRequest = require('./Events/JoinRoomRequest')
let StartGameRequest = require('./Events/StartGameRequest')
requests=[
    VerifyRequest,
    CreateRoomRequest,
    JoinRoomRequest,
    StartGameRequest
]
module.exports= requests