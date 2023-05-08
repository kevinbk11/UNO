module.exports=class Player{
    constructor(name){
        this.name=name
        this.socket;
        this.handCards=[]
    }
    sendError(message){
        this.socket.emit('ErrorEvent',message)
    }
    pushCard(card){
        this.handCards.push(card)
    }
}