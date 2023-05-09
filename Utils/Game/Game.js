const CARD_TYPE = require('./Card/CARD_TYPE')
const CardStack = require('./Card/CardStack')
const PacketBuilder = require('../Builder/PacketBuilder')
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
        this.nowPlayerNumber=0
        this.lastCard
        this.order=1 //1 for 順向 -1 for 逆向
        this.penaltyCardPile=[]
        this.isStacking=false
    }
    init(){
        this.cardStack.buildCardStack()
        this.cardStack.shuffle()
        this.lastCard=this.drawOneCard()
    }
    drawOneCard(){
        return this.cardStack.draw()
    }
    checkThrowIsValid(cards,name){
        const nowPlayer = this.getNowPlayer()
        const requestPlayer = this.players.filter(it=>it.name==name)[0]
        if(cards.length==0)return false
        if(this.isCorrectPlayerThrowing(name)){
            if(this.lastCard.isNoColor()){
                requestPlayer.sendError('上家還未選擇顏色')
                return false
            }
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
        else{
            requestPlayer.sendError('現在不是你的回合。')
            return false
        }
    }
    checkThrowMultipleCardIsValid(cards){
        let firstCard = cards[0]
        for(let i = 0;i<cards.length;i++){
            const it=cards[i]
            if(it.type!=firstCard.type || it.number!=firstCard.number)return false
        }
        if(cards[0].isNoColor())return true
        if(firstCard.number!=this.lastCard.number)return false
        return true
    }
    isCorrectPlayerThrowing(name){
            return this.getNowPlayer().name==name
    }
    throw(cards){
        cards.forEach(card=>{
            const handCards=this.players[this.nowPlayerNumber].handCards
            for(let i =0;i<handCards.length;i++){
                const target = handCards[i]
                if(card.isEqual(target)){              
                    this.lastCard=card
                    handCards.remove(card)
                    break
                }
            }
        })
        if(this.rule.isOverlay){
            if((this.lastCard.type!=CARD_TYPE.PLUS_2 && this.lastCard.type!=CARD_TYPE.WILD_PLUS_4) && this.isStacking){
                this.executePenaltyCardEvent(this.getNowPlayer())
            }
        }
        this.lastCard.executeEffect(this,cards.length)
        this.nowPlayerNumber=this.caculateNextPlayerNumber()
    }
    executePenaltyCardEvent(player){
        player.socket.emit('PenaltyCardEvent',PacketBuilder
        .addData('cards',this.penaltyCardPile)
        .build())
        this.penaltyCardPile.forEach(it=>{
            player.pushCard(it)
        })
        this.penaltyCardPile=[]
        this.isStacking=false
    }
    getNowPlayer(){
        return this.players[this.nowPlayerNumber]
    }
    getPlayer(number){
        return this.players[number]
    }
    caculateNextPlayerNumber(){
        if(this.order==1){
            return (this.nowPlayerNumber+1)%this.players.length
        }
        else{
            if(this.nowPlayerNumber==0)return this.players.length-1
            else{
                return this.nowPlayerNumber-1
            }
        }
    }
}