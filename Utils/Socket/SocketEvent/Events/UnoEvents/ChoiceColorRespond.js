const Game = require("../../../../Game/Game");
const SocketEvent = require("../../SocketEvent");

module.exports = class ChoiceColorRespond extends SocketEvent{
    constructor(){
        super()
        this.name='ChoiceColorRespond'
        this.handler=data=>{
            if(this.clients.has(data.id)){
                data=data.data
                const game = Game.games[data.roomID]
                game.lastCard.color=data.color
            }
        
        }
    }
}