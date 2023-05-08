const CARD_TYPE = require('./Card/CARD_TYPE')
const Plus2 = require('./Card/CardEffect/Plus2')
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
        //if stacking and lastCard != +2 OR +4 (送罰牌請求 把整個罰牌的array丟給倒楣蛋) 

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
        if(cards.length==0)return false
        if(this.isCorrectPlayerThrowing(name)){
            if(cards.length>1){
                if(this.rule.isThrowMultipleCard){
                    if(this.checkThrowMultipleCardIsValid(cards)){
                        return true
                    }
                    else{
                        this.players[this.nowPlayerNumber].sendError('出牌規則錯誤!只能出同數字的牌。')
                        return false
                    }
                }
                else{
                    this.players[this.nowPlayerNumber].sendError('不能一次出多張牌。')
                    return false
                }
            }
            else{
                if(cards[0].isNoColor())return true
                if(cards[0].number==this.lastCard.number || cards[0].color==this.lastCard.color) return true
                else {
                    this.players[this.nowPlayerNumber].sendError('顏色或數字必須和上一張一樣')
                    return false
                }
            }
        }
        else{
            this.players.filter(it=>it.name==name)[0].sendError('現在不是你的回合。')
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
            return this.players[this.nowPlayerNumber].name==name
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
                this.executePenaltyCardEvent(this.nowPlayerNumber)
            }
        }
        else{
            const nextPlayer = this.caculateNextPlayer()
            this.executePenaltyCardEvent(nextPlayer)
        }
        this.lastCard.executeEffect(this,cards.length)
        this.nowPlayerNumber=this.caculateNextPlayer()
    }
    executePenaltyCardEvent(playerNumber){
        const player = this.players[playerNumber]
        player.socket.emit('PenaltyCardEvent',PacketBuilder
        .addData('cards',this.penaltyCardPile)
        .build())
        this.penaltyCardPile.forEach(it=>{
            player.pushCard(it)
        })
        this.penaltyCardPile=[]
        this.isStacking=false
    }
    
    caculateNextPlayer(){
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