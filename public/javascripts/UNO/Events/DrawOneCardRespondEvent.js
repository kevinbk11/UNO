class DrawOneCardRespondEvent extends SocketEvent {
    static self = new this()
    constructor() {
        super('DrawOneCardRespondEvent')
        this.handler = data => {
            this.handCards.push(data)
            $('.CardBlock').append(`<img class='notChoiced noEvent' src=${CardResourceProcessor.processor.getCardImageResource(data)}>`)
            Card.insertCard(this.handCards)
            InitGameRespondEvent.self.clearChoiced() 
            InitGameRespondEvent.self.setCardClickEvent() 
            CardResourceProcessor.processor.setAllCardUnchoiced()
        }
        SocketEvent.events.push(this)
    }
}