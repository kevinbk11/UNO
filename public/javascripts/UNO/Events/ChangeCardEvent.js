class ChangeCardEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ChangeCardEvent')
        this.handler=data=>{
            $('#dropped').attr('src',CardResourceProcessor.processor.getCardImageResource(data))
        }
        SocketEvent.events.push(this)
    }
}