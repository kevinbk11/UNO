class ChoiceColorEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ChoiceColorEvent')
        this.handler=data=>{
            ChangeColorDialog.dialog.show()
        }
        SocketEvent.events.push(this)
    }
}