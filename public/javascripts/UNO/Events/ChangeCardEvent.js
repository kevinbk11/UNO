class ChangeCardEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ChangeCardEvent')
        this.handler=data=>{
            console.log(data)
            $('#dropped').attr('src',CardResourceProcessor.processor.getCardImageResource(data))
        }
        SocketEvent.events.push(this)
    }
}