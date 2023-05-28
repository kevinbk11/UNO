class PenaltyCardEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('PenaltyCardEvent')
        this.handler=(data)=>{
            const processor = CardResourceProcessor.processor
            setTimeout(()=>{  
                processor.playAnimate({place:'.CardBlock',cards:data.cards,handCards:this.handCards})
            },10+Math.random()*5)
        }
        SocketEvent.events.push(this)
    }}