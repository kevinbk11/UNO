const CardStack = require('./Card/CardStack')
const PacketBuilder = require('../Builder/PacketBuilder')
const checker = require('./Rule/RuleChecker')
const releaser = require('../MemoreReleaser')
module.exports=class Game{
    static games={}
    constructor(players,rule,roomID){
        this.roomID=roomID
        this.cardStack;
        this.players=players
        this.rule=rule
        this.nowPlayerNumber=0
        this.lastCard
        this.playerCount=0
        this.order=1 //1 for 順向 -1 for 逆向
        this.penaltyCardPile=[]
        this.isStacking=false
        this.readySet = new Set()
    }
    init(){
        this.cardStack = new CardStack()
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
        const handCards = requestPlayer.handCards
        if(requestPlayer.isDrawed){
            if(cards.length>1)return false
            else if(cards.length==1){
                if(handCards[handCards.length-1].getInfo()!=cards[0].getInfo()){
                    requestPlayer.sendError(`你只能出你抽到的這張牌。抽到的牌是${handCards[handCards.length-1].getInfo()}`)
                    return false
                }
            }
        }
        if(cards.length==0)return false
        if(this.isCorrectPlayerThrowing(name)){
            return this.rule.executeMultipleCardStrategy(this,cards)
        }
        else{
            requestPlayer.sendError('現在不是你的回合。')
            return false
        }
    }
    deleteGame(){
        delete Game.games[this.roomID]
        releaser.releaseGameMemore(this)
        delete this
    }
    removePlayer(playerName){
        if(this.players==null)return
        for(let index=0;index<this.players.length;index++){
            if(this.players[index].name==playerName){
                this.players.splice(index,1)
            }
        }
        if(this.players.length==0){
            this.deleteGame()
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
        if(nowPlayer.handCards.length==0){
            this.gameOver()
        }
        this.nowPlayerNumber=this.caculateNextPlayerNumber()
        for(let i =0;i<this.players.length;i++){
            const it = this.players[i]
            it.socket.emit('ChangePlayerEvent',PacketBuilder
            .addData('you',i)
            .addData('target',this.nowPlayerNumber)
            .addData('numberOfPeople',this.players.length)
            .build())
        }
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
    restart(){
        this.players.forEach(it=>{
            it.handCards=[]
            it.isUno=false;
            it.isDrawed=false
        })
        this.playerCount=0
        this.order=1
        this.penaltyCardPile.length=0
        this.isStacking=false
        this.init()
    }
    updateAllPlayerHandCards(changerNumber,number,isDraw=true){
        for(let i=0;i<this.players.length;i++){
            if(i!=changerNumber){
                this.players[i].socket.emit("UpdatePlayerHandCardsEvent",PacketBuilder
                .addData('who',changerNumber)
                .addData('you',i)
                .addData('numberOfPeople',this.players.length)
                .addData('numberOfCards',number)
                .addData('isDraw',isDraw)
                .build())
            }
        }
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
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].name==player.name){
                this.updateAllPlayerHandCards(i,this.penaltyCardPile.length)
                break
            }
        }
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