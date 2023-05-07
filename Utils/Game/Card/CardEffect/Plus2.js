const PacketBuilder = require("../../../Builder/PacketBuilder")

module.exports = class Plus2{
    execute(game,times){
        console.log(times)
        for(let i=0;i<2*times;i++){
            game.penaltyCardPile.push(game.drawOneCard())
        }
        const nextPlayer = game.players[game.caculateNextPlayer()]
        if(game.rule.isOverlay){
            nextPlayer.socket.emit('StackablePenaltyCardEvent',PacketBuilder
            .build())
        }
        else{
            nextPlayer.socket.emit('PenaltyCardEvent',PacketBuilder
            .addData('cards',game.penaltyCardPile)
            .build())
            game.penaltyCardPile.forEach(it=>{
                nextPlayer.handCards.push(it)
            })
            game.penaltyCardPile=[]
        }
    }
}