const checker = require("./Rule/RuleChecker");
const Rule = require("./Rule/Rule");
const AllowMultipleThrow = require("./Rule/RuleStrategy/MultipleThrow/AllowMultipleThrow");

Array.prototype.remove = function(value) {
    const index = this.indexOf(value)
    this.splice(index, 1);
    return index
}
module.exports=class Player{
    constructor(name){
        this.name=name
        this.socket;
        this.game;
        this.handCards=[]
        this.isUno;
    }
    sendError(message){
        this.socket.emit('ErrorEvent',message)
    }
    pushCard(card){
        this.handCards.push(card)
    }
    dropCard(cards){
        const game=this.game
        cards.forEach(card=>{
            for(let i =0;i<this.handCards.length;i++){
                const target = this.handCards[i]
                if(card.isEqual(target)){        
                    game.lastCard=card
                    this.handCards.remove(target)
                    break
                }
            }0
        })
        if(checker.checkUno(this)){//檢查有沒有正確的喊或亂喊
            if(this.handCards.length==0){
                //game.over
            }
        }
        else{
            game.executeUnoPenaltyCard(this)
        }    
        
        this.isUno=false
        game.endRound(cards)
    }
}