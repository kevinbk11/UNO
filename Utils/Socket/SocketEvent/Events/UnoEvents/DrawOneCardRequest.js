const Game = require("../../../../Game/Game");
const checker = require("../../../../Game/Rule/RuleChecker");
const SocketEvent = require("../../SocketEvent");

module.exports = class DrawOneCardRequest extends SocketEvent{
    constructor(){
        super()
        this.name='DrawOneCardRequest'
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                const game = Game.games[data.roomID]
                const player = game.getPlayerByName(data.name)
                if(game.isCorrectPlayerThrowing(data.name) && !player.isDrawed){
                    player.isDrawed=true
                    const newCard = game.drawOneCard()
                    player.pushCard(newCard)
                    this.socket.emit('DrawOneCardRespondEvent',newCard)
                    if(!checker.checkOneCardIsValid(game,newCard)){
                        game.endRound()
                    }

                }

            }
        
        }
    }
}