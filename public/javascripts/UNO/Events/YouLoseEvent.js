class YouLoseEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('YouLoseEvent')
        this.hand=[]

        this.handler=(data)=>{
            alert(`你輸了!!贏家是${data}`)
        }
        SocketEvent.events.push(this)
    }
}