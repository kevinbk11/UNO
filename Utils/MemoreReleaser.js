//絕對
//不要
//require Player的module
const Room = require("./Game/Room")
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
            try{
                const it=names[i]
                if(SocketController.nameToClient[it].id==socket.id){
                    console.log(`delete user:${it}`)
                    if(this.allPlayer[it]!=null){
                        const game = this.allPlayer[it].game
                        game.removePlayer(it)
                        if(game.players!=null){
                            for(let j=0;j<game.players.length;j++){
                                const player = game.players[j]
                                player.sendError('有人斷線了!將自動終止遊戲並返回大廳。')
                                delete SocketController.nameToClient[player.name]
                            }
                        }
                    }
                    const rooms = Object.values(Room.rooms)
                    for(let i=0;i<rooms.length;i++){
                        const room = rooms[i]
                        if(room.someoneIn){
                            room.someoneIn=false
                            break
                        }
                        else if(room.players.includes(it)){
                            if(room.getPlayerNumber(it)!=1){
                                room.players.forEach(player=>{
                                    if(it!=player)
                                        SocketController.nameToClient[player].emit('ExitEvent',room.getPlayerNumber(it))
                                })
                            }
                            else{
                                room.players.forEach(player=>{
                                    if(it!=player)
                                        SocketController.nameToClient[player].emit('RoomDissolveEvent',player)
                                })
                                delete Room.rooms[room.roomID]
                            }
                            const number = room.getPlayerNumber(it)
                            room.players.splice(number-1,1)
                            break
                        }
                    }
                    delete SocketController.nameToClient[it]
                }
            }
            catch(e){
                console.log(e)
            }
        }
        
    }
}
module.exports =  MemoreReleaser.releaser