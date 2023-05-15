const IMultipleThrow = require("./IMultipleThrow")
const checker  = require("../../RuleChecker")
module.exports = class AllowMultipleThrow extends IMultipleThrow{
    execute(game,cards){
        console.log(cards)
        if(cards.length==1){
            if(checker.checkOneCardIsValid(game,cards[0])){
                return true
            }
            else{
                game.getNowPlayer().sendError('卡片必須和上一張的數字或顏色相同。')
            }
        }
        if(checker.checkThrowMultipleCardIsValid(cards)){
            if(cards[0].isNoColor())return true
            return cards[0].number==game.lastCard.number
        }
        else{
            game.getNowPlayer().sendError('出牌規則錯誤!只能出同數字的牌。')
            return false
        }
    }
}