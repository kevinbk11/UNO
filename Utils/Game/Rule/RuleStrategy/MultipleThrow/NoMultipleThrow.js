const checker = require("../../RuleChecker")
const IRuleStrategy = require("./IMultipleThrow")

module.exports = class NoMultipleThrow extends IRuleStrategy{
    execute(game,cards){
        const nowPlayer = game.getNowPlayer()
        if(cards.length>1){
            nowPlayer.sendError('不能一次出多張牌。')
            return false
        }
        else{
            if(checker.checkOneCardIsValid(game,cards[0])){
                return true
            }
            else{
                game.getNowPlayer().sendError('卡片必須和上一張的數字或顏色相同。')
            }
        }
    }
}