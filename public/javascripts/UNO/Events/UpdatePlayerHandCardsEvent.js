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
            let everyone = [$('.bottom'),$('.right'),$('.top'),$('.left')]
            console.log(data)
            console.log(dif)
            if(data.isDraw){
                for(let i=0;i<data.numberOfCards;i++){
                    everyone[dif].append(`<img src='/images/cards/back.png'>`)
                }
            }
            else{
                for(let i=0;i<data.numberOfCards;i++){
                    everyone[dif].children()[0].remove()
                }
                
            }
            
        }
        SocketEvent.events.push(this)
    }}