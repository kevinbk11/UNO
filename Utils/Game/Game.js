const CARD_TYPE = require('./Card/CARD_TYPE')
const CardStack = require('./Card/CardStack')
const PacketBuilder = require('../Builder/PacketBuilder')
const Card = require('./Card/Card')
const remove = require('../remove')
const checker = require('./Rule/RuleChecker')
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
        while(this.lastCard.isNoColor()){
            this.cardStack.push(this.lastCard)
            this.cardStack.shuffle()
            this.lastCard=this.drawOneCard()
        }
    }
    drawOneCard(){
        return this.cardStack.draw()
    }
    dropCardOnTable(card){
        this.cardStack.pushDroppedCard(card)
    }
    checkThrowIsValid(cards,name){
        if(checker.checkLastCardHasColor(this)){
            this.getPlayerByName(name).sendError('目前還未選擇顏色')
            return false
        }
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
    endRound(droppedCards=null){
        const nowPlayer = this.getNowPlayer()
        const punishedPlayer = this.rule.isAllowStacking? this.nowPlayerNumber:this.caculateNextPlayerNumber()//不要更變這四行的順序
        if(droppedCards!=null){
            this.lastCard.executeEffect(this,droppedCards.length)
        }
        nowPlayer.isDrawed=false
        this.rule.executeStackingStrategy(this,punishedPlayer,droppedCards)
        this.nowPlayerNumber=this.caculateNextPlayerNumber()
    }
    gameOver(){
        const winner = this.getNowPlayer()
        const losers = this.players.filter(it=>it.name!=winner.name)
        const playersName = []
        this.players.forEach(it=>{
            playersName.push(it.name)
        })
        const gameOverPacket=PacketBuilder
        .addData('playersName',playersName)
        .addData('winnerName',winner.name)
        .build()
        winner.socket.emit("YouWinEvent",gameOverPacket)
        losers.forEach(it=>{
            it.socket.emit("YouLoseEvent",gameOverPacket)
        })
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
    executeUnoPenaltyCard(player){
        const cards=[]
        for(let i=0;i<2;i++){
            cards.push(this.drawOneCard())
        }
        player.socket.emit('PenaltyCardEvent',PacketBuilder
        .addData('cards',cards)
        .build())
        cards.forEach(it=>{
            player.pushCard(it)
        })
    }
    getNowPlayer(){
        return this.players[this.nowPlayerNumber]
    }
    getPlayer(number){
        return this.players[number]
    }
    getPlayerByName(name){
        return this.players.filter(it=>it.name==name)[0]
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