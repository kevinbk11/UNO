class ErrorEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ErrorEvent')
        this.handler=(data)=>{
            alert(data)
            if(data=='有人斷線了!將自動終止遊戲並返回大廳。'){
                postRedirect('/',{name:this.userName})
            }
        }
        SocketEvent.events.push(this)
    }}