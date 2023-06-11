class ExitEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ExitEvent')
        this.handler=(data)=>{
            for(let i=data;i<4;i++){
                $(`#name${i}`).val($(`#name${i+1}`).val())
            }
        }
        SocketEvent.events.push(this)
    }}