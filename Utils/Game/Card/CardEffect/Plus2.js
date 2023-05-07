const PacketBuilder = require("../../../Builder/PacketBuilder")

module.exports = class Plus2{
    execute(game){
        for(let i=0;i<2;i++){
            game.penaltyCardPile.push(game.drawOneCard())
        }
        const nextPlayerSocket = game.players[game.caculateNextPlayer()].socket
        if(game.rule.isOverlay){
            nextPlayerSocket.emit('StackablePenaltyCardEvent',PacketBuilder
            .build())
        }
        else{
            nextPlayerSocket.emit('PenaltyCardEvent',PacketBuilder
            .addData('cards',game.penaltyCardPile)
            .build())
            game.penaltyCardPile=[]
        }
    }
}