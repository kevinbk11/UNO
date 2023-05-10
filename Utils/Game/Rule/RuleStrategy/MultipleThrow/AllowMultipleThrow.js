const IRuleStrategy = require("../IRuleStrategy")

module.exports = class AllowMultipleThrow extends IRuleStrategy{
    execute(game,cards){
        console.log("??")
        if(cards.length==1){
            return this.checkOneCardIsValid(game,cards[0])
        }
        if(this.checkThrowMultipleCardIsValid(game,cards)){
            console.log("?")
            return true
        }
        else{
            game.getNowPlayer().sendError('出牌規則錯誤!只能出同數字的牌。')
            return false
        }
    }
    checkThrowMultipleCardIsValid(game,cards){
        let firstCard = cards[0]
        for(let i = 0;i<cards.length;i++){
            const it=cards[i]
            if(it.type!=firstCard.type || it.number!=firstCard.number)return false
        }
        if(cards[0].isNoColor())return true
        if(firstCard.number!=game.lastCard.number)return false
        return true
    }
}