class PenaltyCardEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('PenaltyCardEvent')
        this.handler=(data)=>{
            data.cards.forEach(it=>{
                this.handCards.push(it)
                $('.CardBlock').append(`<img class='notChoiced noEvent' src=${CardResourceProcessor.processor.getCardImageResource(it)}>`)
                Card.insertCard(this.handCards)
                InitGameRespondEvent.self.clearChoiced()
                InitGameRespondEvent.self.setCardClickEvent() 
                CardResourceProcessor.processor.setAllCardUnchoiced()
            })
            
        }
        SocketEvent.events.push(this)
    }}