class UpdatePlayerHandCardsEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('UpdatePlayerHandCardsEvent')
        this.hand=[]

        this.handler=(data)=>{
            const who = data.who//0 
            let you = data.you//1
            let numberOfPeople = data.numberOfPeople
            const dif = ((who-you)+numberOfPeople)%numberOfPeople
            let everyone = ['.bottom','.right','.top','.left']
            const processor = CardResourceProcessor.processor
            if(data.isDraw){
                let count = 0
                let id = setInterval(()=>{
                    processor.playDrawCardAnimate(everyone[dif],processor.getCardImageResource('back'))
                    count++
                    if(count==data.numberOfCards)clearInterval(id)
                },170)
            }
            else{
                for(let i=0;i<data.numberOfCards;i++){
                    $(everyone[dif]).children()[0].remove()
                }
                
            }
            
        }
        SocketEvent.events.push(this)
    }}