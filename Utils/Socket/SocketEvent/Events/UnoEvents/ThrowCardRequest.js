const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
module.exports = class ThrowCardRequest extends SocketEvent{
    constructor(){
        super()
        this.name='ThrowCardRequest'
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                console.log(data)
                const cards = data.cards
                const game = Game.games[data.roomID]
                console.log(game)
                game.checkThrowIsValid(cards,data.name)
            }

            
                

        }
    }
}