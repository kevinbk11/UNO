class ExitEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ExitEvent')
        this.handler=(data)=>{
            for(let i=data;i<4;i++){
                $(`.name${i}`).text($(`.name${i+1}`).text())
            }
            $('.name4').text('　')
        }
        SocketEvent.events.push(this)
    }}