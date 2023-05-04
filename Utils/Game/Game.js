const CardStack = require('./Card/CardStack')
module.exports=class Game{
    static games={}
    constructor(players,rule,roomID){
        this.roomID=roomID
        this.cardStack=new CardStack()
        this.players=players
        this.rule=rule
        this.cardStack.buildCardStack()
        this.cardStack.shuffle()
    }

}