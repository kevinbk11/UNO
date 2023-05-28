class DrawOneCardRespondEvent extends SocketEvent {
    static self = new this()
    constructor() {
        super('DrawOneCardRespondEvent')
        this.handler = data => {
            this.handCards.push(data)
            const processor = CardResourceProcessor.processor
            const location = '.CardBlock'
            const cardResource = processor.getCardImageResource(data)
            processor.playDrawCardAnimate(location,cardResource,this.handCards)
            InitGameRespondEvent.self.clearChoiced() 
            InitGameRespondEvent.self.setCardClickEvent() 
            processor.setAllCardUnchoiced()
        }
        SocketEvent.events.push(this)
    }
}