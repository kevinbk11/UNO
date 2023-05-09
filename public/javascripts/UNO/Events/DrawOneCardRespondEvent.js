class DrawOneCardRespondEvent extends SocketEvent {
    static self = new this()
    constructor() {
        super('DrawOneCardRespondEvent')
        this.handler = data => {
            this.handCards.push(data)
            $('.CardBlock').append(`
            <img 
                class='notChoiced noEvent notAnimated' 
                src="/images/cards/none.png" 
            >`)
            Card.insertCard(this.handCards)
            new Promise((resolve,reject)=>{
                $('#draw').effect('transfer',{to:$('.CardBlock img.notAnimated')},1000)
                $(".ui-effects-transfer:last").css("background-image", "url(" + CardResourceProcessor.processor.getCardImageResource(data) + ")");
                $(".ui-effects-transfer:last").css('background-size','150px 214px')
                setTimeout(()=>{resolve()},1000)
            }).then(()=>{
                InitGameRespondEvent.self.clearChoiced() 
                InitGameRespondEvent.self.setCardClickEvent() 
                CardResourceProcessor.processor.setAllCardUnchoiced()
                $('.CardBlock img.notAnimated').attr('src',CardResourceProcessor.processor.getCardImageResource(data))
                $('.CardBlock img.notAnimated').removeClass('notAnimated')
            })
        }
        SocketEvent.events.push(this)
    }
}