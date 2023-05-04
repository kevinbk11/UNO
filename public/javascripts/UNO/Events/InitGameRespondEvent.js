class InitGameRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('InitGameRespondEvent')
        this.handler=(data)=>{
            console.log(data)
            for(let i=0;i<7;i++){
                const card = data.cards[i]
                if(card.type=='number'){
                    $('.box.bottom').append(`<img src='/images/cards/${card.color}-${card.number}.png'>`)
                }
                else if(card.color==null){
                    $('.box.bottom').append(`<img src='/images/cards/${card.type}.png'>`)
                }
                else{
                    $('.box.bottom').append(`<img src='/images/cards/${card.color}-${card.type}.png'>`)
                }
            }
            
            console.log(data.cards)
        }
        SocketEvent.events.push(this)
    }
}