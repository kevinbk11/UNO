class ThrowCardRespondEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ThrowCardRespondEvent')
        this.hand=[]

        this.handler=(data)=>{
            let cardsImg = $('.box.bottom img')
            const numbers = data.removedCardNumber
            const lastCardIndex = numbers[numbers.length-1]
            $('#dropped').attr('src',cardsImg[lastCardIndex].src)
            data.removedCardNumber.forEach((it)=>{
                cardsImg[it].remove()
            })
            

            let removed=0
            for(let i=0;removed<numbers.length;i++){
                if(numbers.includes(i)){
                    this.handCards.splice(i,1)
                    i--
                    removed++
                }
            }
            InitGameRespondEvent.self.clearChoiced()
            CardResourceProcessor.processor.setAllCardUnchoiced()
        }
        SocketEvent.events.push(this)
    }}