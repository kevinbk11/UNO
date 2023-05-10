const CARD_TYPE = require('./Card/CARD_TYPE')
const CardStack = require('./Card/CardStack')
const PacketBuilder = require('../Builder/PacketBuilder')
const Card = require('./Card/Card')
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
        console.log(this.rule)
        this.cardStack.buildCardStack()
        this.cardStack.shuffle()
        this.lastCard=this.drawOneCard()
        while(this.lastCard.isNoColor()){
            this.cardStack.push(this.lastCard)
            this.cardStack.shuffle()
            this.lastCard=this.drawOneCard()
        }
    }
    drawOneCard(){
        return this.cardStack.draw()
    }
    checkThrowIsValid(cards,name){
        const requestPlayer = this.players.filter(it=>it.name==name)[0]
        if(cards.length==0)return  false
        if(this.isCorrectPlayerThrowing(name)){
            return this.rule.executeMultipleCardStrategy(this,cards)
        }
        else{
            requestPlayer.sendError('現在不是你的回合。')
            return false
        }
    }
    endRound(droppedCards){
        this.lastCard.executeEffect(this,droppedCards.length)
        this.rule.executeStackingStrategy(this)
        this.nowPlayerNumber=this.caculateNextPlayerNumber()
    }
    isCorrectPlayerThrowing(name){
            return this.getNowPlayer().name==name
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