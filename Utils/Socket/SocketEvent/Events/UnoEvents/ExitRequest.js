const Game = require("../../../../Game/Game");
const checker = require("../../../../Game/Rule/RuleChecker");
const SocketEvent = require("../../SocketEvent");

module.exports = class ExitRequest extends SocketEvent{
    constructor(){
        super()
        this.name='ExitRequest'
        this.handler=data=>{
            if(this.clients.has(data.id)){
                data=data.data
                const game=Game.games[data.roomID]
                game.removePlayer(data.name)
            }
        }
        //你還在refactor
    }
}