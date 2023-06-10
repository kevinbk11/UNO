class ChangePlayerEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ChangePlayerEvent')
        this.handler=data=>{
            const myNumber=data.you
            const target=data.target
            const numberOfPeople = data.numberOfPeople
            const dif = ((target-myNumber)+numberOfPeople)%numberOfPeople
            for(let i=1;i<=numberOfPeople;i++){
                let text = $(`.name-display${i} #name${i}`).text()
                while(text.substring(text.length-2, text.length)=='✔️'){
                    text=text.substring(0,text.length-2)
                    $(`.name-display${i} #name${i}`).text(text)
                }
            }
            const text = $(`.name-display${dif+1} #name${dif+1}`).text()
            $(`.name-display${dif+1} #name${dif+1}`).text(`${text}✔️`)
        }
        SocketEvent.events.push(this)
    }
}