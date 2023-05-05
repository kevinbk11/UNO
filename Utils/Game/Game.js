const CardStack = require('./Card/CardStack')
const ThrowMultipleCardStrategy = require('./Strategy/ThrowMultipleCardStrategy')
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
        this.throwMultipleCardStrategy
    }
    setupStrategy(rule){
        if(rule.throwMultipleCard)game.throwMultipleCardStrategy=new ThrowMultipleCardStrategy()
        else this.throwMultipleCardStrategy=(cards)=>{return false}
    }
    drawOneCard(){
        return this.cardStack.draw()
    }
    checkThrowIsValid(cards,name){
        console.log(cards)
        if(this.isCorrectPlayerThrowing(name)){
            if(cards.length>1){
                if(!this.throwMultipleCardStrategy.execute(cards)){
                    return false
                }
            }
        }
    }
    isCorrectPlayerThrowing(name){
        return this.players[this.nowPlayer].name==name
    }
}