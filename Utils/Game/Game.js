const CardStack = require('./Card/CardStack')
Array.prototype.remove=function(value){
    for(let index =0;index<this.length;index++){
        const it = this[index]
        if(it.isEqual(value)){
            this.splice(index,1)
            return true
        }
        return false
    }
}
module.exports=class Game{
    static games={}
    constructor(players,rule,roomID){
        this.roomID=roomID
        this.cardStack=new CardStack()
        this.players=players
        this.rule=rule
        this.nowPlayer=0
        this.lastCard
        this.order=1 //1 for 順向 -1 for 逆向
        this.penaltyCardPile=[]
    }
    init(){
        this.cardStack.buildCardStack()
        this.cardStack.shuffle()
        this.setupStrategy()
        this.lastCard=this.drawOneCard()
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
                if(cards[0].color==null)return true
                if(cards[0].number==this.lastCard.number || cards[0].color==this.lastCard.color) return true
                else {
                    this.players[this.nowPlayer].socket.emit('ErrorEvent','顏色或數字必須和上一張一樣')
                    return false
                }
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
        if(firstCard.number!=this.lastCard.number)return false
        //如果出的數字和上一張卡不同那就FALSE
        return true
    }
    isCorrectPlayerThrowing(name){
            return this.players[this.nowPlayer].name==name

    }
    throw(cards){
        cards.forEach(card=>{
            const handCards=this.players[this.nowPlayer].handCards
            let find = false
            for(let i =0;i<handCards.length;i++){
                const target = handCards[i]
                if(card.isEqual(target)){
                    
                    this.lastCard=card
                    this.lastCard.executeEffect(this)
                    handCards.remove(card)
                    find=true
                    break
                }
            }
            if(!find){
                console.log(cards)
                console.log(card)
                console.log(handCards)
            }

        })
        this.nowPlayer=this.caculateNextPlayer()
    }
    caculateNextPlayer(){
        if(this.order==1){
            return (this.nowPlayer+1)%this.players.length
        }
        else{
            if(this.nowPlayer==0)return this.players.length-1
            else{
                return this.nowPlayer-1
            }
        }
    }
}