class YouWinEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('YouWinEvent')
        this.hand=[]

        this.handler=(data)=>{
            alert(`你贏了!!`)
        }
        SocketEvent.events.push(this)
    }
}