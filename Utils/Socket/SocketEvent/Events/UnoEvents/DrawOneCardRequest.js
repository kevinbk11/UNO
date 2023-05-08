const Game = require("../../../../Game/Game");
const SocketEvent = require("../../SocketEvent");

module.exports = class DrawOneCardRequest extends SocketEvent{
    constructor(){
        super()
        this.name='DrawOneCardRequest'
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                const game = Game.games[data.roomID]
                const newCard = game.drawOneCard()

                game.players.filter(it=>it.name==data.name)[0].pushCard(newCard)
                this.socket.emit('DrawOneCardRespondEvent',newCard)
            }
        
        }
    }
}