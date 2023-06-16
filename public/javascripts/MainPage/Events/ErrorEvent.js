class ErrorEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ErrorEvent')
        this.handler=(data)=>{
            alert(data)
        }
        SocketEvent.events.push(this)
    }}