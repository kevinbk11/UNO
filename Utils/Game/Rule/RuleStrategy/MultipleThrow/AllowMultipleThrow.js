const IMultipleThrow = require("./IMultipleThrow")

module.exports = class AllowMultipleThrow extends IMultipleThrow{
    execute(game,cards){
        if(cards.length==1){
            return this.checkOneCardIsValid(game,cards[0])
        }
        if(AllowMultipleThrow.checkThrowMultipleCardIsValid(cards)){
            if(cards[0].isNoColor())return true
            return cards[0].number==game.lastCard.number
        }
        else{
            game.getNowPlayer().sendError('出牌規則錯誤!只能出同數字的牌。')
            return false
        }
    }
    static checkThrowMultipleCardIsValid(cards){
        let firstCard = cards[0]
        for(let i = 0;i<cards.length;i++){
            const it=cards[i]
            if(it.type!=firstCard.type || it.number!=firstCard.number)return false
        }
        return true
    }
}