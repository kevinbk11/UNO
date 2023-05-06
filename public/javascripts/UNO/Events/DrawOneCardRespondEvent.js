class DrawOneCardRespondEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('DrawOneCardRespondEvent')
        this.handler=data=>{
            this.handCards.push(data)
            $('.CardBlock').append(`<img class='notChoiced noEvent' src=${CardResourceProcessor.processor.getCardImageResource(data)}>`)
            InitGameRespondEvent.self.setCardClickEvent()
        }
        SocketEvent.events.push(this)
    }
}