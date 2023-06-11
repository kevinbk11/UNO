class ChangePlayerEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ChangePlayerEvent')
        this.handler=data=>{
            const myNumber=data.you
            const target=data.target
            const numberOfPeople = data.numberOfPeople
            const dif = ((target-myNumber)+numberOfPeople)%numberOfPeople
            DynamicNameProcessor.processor.clearAllTick(numberOfPeople)
            const text = $(`.name-display${dif+1} #name${dif+1}`).text()
            $(`.name-display${dif+1} #name${dif+1}`).text(`${text}✔️`)
        }
        SocketEvent.events.push(this)
    }
}