const CARD_TYPE = require('../CARD_TYPE')
module.exports = class Plus2{
    execute(game,times){
        game.isStacking=true
        for(let i=0;i<2*times;i++){
            game.penaltyCardPile.push(game.drawOneCard())
        }
    }
}