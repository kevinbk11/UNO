module.exports=class Player{
    constructor(name){
        this.name=name
        this.socket;
        this.game;
        this.handCards=[]
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
            const handCards=game.getNowPlayer().handCards
            for(let i =0;i<handCards.length;i++){
                const target = handCards[i]
                if(card.isEqual(target)){              
                    game.lastCard=card
                    handCards.remove(card)
                    break
                }
            }
        })
        game.endRound(cards)
    }
}