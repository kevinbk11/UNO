module.exports = class IPlus{
    plus(game,base,times){
        game.isStacking=true
        for(let i=0;i<base*times;i++){
            game.penaltyCardPile.push(game.drawOneCard())
        }
        if(!game.rule.isOverlay){
            const nextPlayer = game.getPlayer(game.caculateNextPlayerNumber())
            game.executePenaltyCardEvent(nextPlayer)
        }
    }
}