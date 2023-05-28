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
                const cards = []
                for(let i=0;i<data.numberOfCards;i++)cards.push(['back'])
                processor.playAnimate({place:everyone[dif],cards:cards,handCards:null})
            }
            else{
                for(let i=0;i<data.numberOfCards;i++){
                    $(everyone[dif]).children()[0].remove()
                }
                
            }
            
        }
        SocketEvent.events.push(this)
    }}