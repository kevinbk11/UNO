class StackingEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('StackingEvent')
        this.handler=data=>{
            $('.display #plus').text(`現在疊了${data}張`)
        }
        SocketEvent.events.push(this)
    }
}