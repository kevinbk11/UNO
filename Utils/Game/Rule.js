module.exports=class Rule{
    constructor(){
        this.isAllowThrowMultipleCard=false
        this.isAllowStacking=false
        this.throwMultipleCardStrategy;
        this.stackingStrategy;
    }
    static buildRule(data){
        let newRule = new this()
        newRule.isAllowThrowMultipleCard=data.isAllowThrowMultipleCard
        newRule.isAllowStacking=data.isAllowStacking
        return newRule
    }
    executeMultipleCardRuleCheck(game,cards){
        const nowPlayer = game.getNowPlayer()
        if(game.lastCard.isNoColor()){
            nowPlayer.sendError('上家還未選擇顏色')
            return false
        }
        if(cards.length>1){
            if(this.isAllowThrowMultipleCard){//一個策略取代if else
                if(this.checkThrowMultipleCardIsValid(game,cards)){
                    return true
                }
                else{
                    nowPlayer.sendError('出牌規則錯誤!只能出同數字的牌。')
                    return false
                }
            }
            else{
                nowPlayer.sendError('不能一次出多張牌。')
                return false
            }
        }
        else{
            if(cards[0].isNoColor())return true
            if(cards[0].number==game.lastCard.number || cards[0].color==game.lastCard.color) return true
            else {
                nowPlayer.sendError('顏色或數字必須和上一張一樣')
                return false
            }
        }
    }
    executeStackingCheck(game){
        if(this.isAllowStacking){
            if((game.lastCard.type!=CARD_TYPE.PLUS_2 && game.lastCard.type!=CARD_TYPE.WILD_PLUS_4) && game.isStacking){
                game.executePenaltyCardEvent(game.getNowPlayer())
            }
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