module.exports=class Rule{
    constructor(){
        this.isThrowMultipleCard=false
        this.isOverlay=false
    }
    test(){
        if(cards.length>1){
            if(this.rule.isThrowMultipleCard){
                if(this.checkThrowMultipleCardIsValid(cards)){
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
            if(cards[0].number==this.lastCard.number || cards[0].color==this.lastCard.color) return true
            else {
                nowPlayer.sendError('顏色或數字必須和上一張一樣')
                return false
            }
        }
    }
}