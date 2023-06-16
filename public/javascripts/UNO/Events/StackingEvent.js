class StackingEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('StackingEvent')
        this.handler=data=>{
            console.log(data)
            if(data!=-1){
                $('.display #plus').text(`現在疊了${data}張`)
            }
            else{
                $('.display #plus').text(``)
            }
        }
        SocketEvent.events.push(this)
    }
}