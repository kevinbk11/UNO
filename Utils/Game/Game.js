const CardStack = require('./Card/CardStack')
Array.prototype.remove=function(value){
    this.forEach((it,index)=>{
        if(it.isEqual(value)){
            this.splice(index,1)
            return true
        }
        return false
    })
}
module.exports=class Game{
    static games={}
    constructor(players,rule,roomID){
        this.roomID=roomID
        this.cardStack=new CardStack()
        this.players=players
        this.rule=rule
        this.nowPlayer=0
        this.cardStack.buildCardStack()
        this.cardStack.shuffle()
        this.setupStrategy()
    }
    setupStrategy(){
    }
    drawOneCard(){
        return this.cardStack.draw()
    }
    checkThrowIsValid(cards,name){
        if(cards.length==0)return false
        if(this.isCorrectPlayerThrowing(name)){
            if(cards.length>1){
                if(this.rule.isThrowMultipleCard){
                    if(this.checkThrowMultipleCardIsValid(cards)){
                        return true
                    }
                    else{
                        this.players[this.nowPlayer].socket.emit('ErrorEvent','出牌規則錯誤!只能出同數字的牌。')
                        return false
                    }
                }
                else{
                    this.players[this.nowPlayer].socket.emit('ErrorEvent','不能一次出多張牌。')
                    return false
                }
            }
            else{
                return true
            }
        }
        else{
            this.players.filter(it=>it.name==name)[0].socket.emit('ErrorEvent','現在不是你的回合。')
            return false
        }
    }
    checkThrowMultipleCardIsValid(cards){
        let firstCard = cards[0]
        for(let i = 0;i<cards.length;i++){
            const it=cards[i]
            if(it.type!=firstCard.type || it.number!=firstCard.number)return false
        }
        return true
    }
    isCorrectPlayerThrowing(name){
            return this.players[this.nowPlayer].name==name

    }
    throw(cards){
        const handCards=this.players[this.nowPlayer].handCards
        console.log(handCards)
        cards.forEach(card=>{
            handCards.forEach(target=>{
                if(card.isEqual(target)){
                    let removedCard = handCards.remove(card)
                }
            })
        })
        this.nowPlayer=(this.nowPlayer+1)%this.players.length
    }
}