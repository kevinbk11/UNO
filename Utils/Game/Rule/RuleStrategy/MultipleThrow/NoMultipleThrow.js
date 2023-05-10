const IRuleStrategy = require("../IRuleStrategy")

module.exports = class NoMultipleThrow extends IRuleStrategy{
    execute(game,cards){
        const nowPlayer = game.getNowPlayer()
        if(cards.length>1){
            nowPlayer.sendError('不能一次出多張牌。')
            return false
        }
        else{
            return this.checkOneCardIsValid(game,cards[0])
        }
    }
}