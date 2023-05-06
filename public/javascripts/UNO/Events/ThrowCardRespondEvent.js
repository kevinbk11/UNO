class ThrowCardRespondEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ThrowCardRespondEvent')
        this.hand=[]
        
        this.handler=(data)=>{
            let cardsImg = $('.box.bottom img')
            data.removedCardNumber.forEach((it)=>{
                cardsImg[it].remove()
            })
            const numbers = data.removedCardNumber
            let removed=0
            for(let i=0;removed<numbers.length;i++){
                if(numbers.includes(i)){
                    this.handCards.splice(i,1)
                    i--
                    removed++
                }
            }
        }
        SocketEvent.events.push(this)
    }}