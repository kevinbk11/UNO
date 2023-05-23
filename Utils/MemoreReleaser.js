//絕對
//不要
//require Player的module
class MemoreReleaser{
    static releaser = new this()
    constructor(){
        this.allPlayer={}
    }
    releaseGameMemore(game){ 
        console.log(`delete game:${game.roomID}`)
        delete game.roomID
        delete game.cardStack;
        delete game.players
        delete game.rule
        delete game.nowPlayerNumber
        delete game.lastCard
        delete game.order //1 for 順向 -1 for 逆向
        delete game.penaltyCardPile
        delete game.isStacking
    }
    releaseSocketMemore(socket){
        const SocketController = require("./Socket/SocketController")
        const id = SocketController.socketIDToUserID[socket.id]
        delete SocketController.socketIDToUserID[socket.id]
        SocketController.clients.delete(id)
        const names = Object.keys(SocketController.nameToClient)
        for(let i =0;i<names.length;i++){
            const it=names[i]
            if(SocketController.nameToClient[it].id==socket.id){
                console.log(`delete user:${it}`)
                if(this.allPlayer[it]!=null){
                    const game = this.allPlayer[it].game
                    console.log(it)
                    game.removePlayer(it)
                    for(let j=0;j<game.players.length;j++){
                        const player = game.players[j]
                        console.log(player)
                        player.sendError('有人斷線了!將自動終止遊戲並返回大廳。')
                    }
                }
                delete SocketController.nameToClient[it]
            }
        }
        
    }
}
module.exports =  MemoreReleaser.releaser