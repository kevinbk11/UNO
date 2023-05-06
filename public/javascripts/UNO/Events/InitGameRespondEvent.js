class InitGameRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('InitGameRespondEvent')
        this.choiced=[]
        this.handler=(data)=>{
            const colors = {'red':1,'yellow':2,'blue':3,'green':4,null:0}
            data.cards.sort((a,b)=>{
                if(colors[a.color]>colors[b.color])return -1
                if(colors[a.color]<colors[b.color])return 1
                if(colors[a.color]==colors[b.color]){
                    if(a.number>b.number)return 1
                    if(a.number<b.number)return -1
                    return 0
                }
            })
            data.cards.forEach((it)=>{
                this.handCards.push(it)
            })
            this.showCard(0,data.cards,data.players)
            const firstCard=data.firstCard
            $('#dropped').attr('src',CardResourceProcessor.processor.getCardImageResource(firstCard))

        }
        SocketEvent.events.push(this)
    }
    clearChoiced(){
        this.choiced=[]
    }
    showCard(i,cards,players){
        if(i==7){
            this.setCardClickEvent()
            this.setThrowCardButton()
            return
        }   
        new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const card = cards[i]
                $('.CardBlock').append(`<img class ='notChoiced noEvent' src='${CardResourceProcessor.processor.getCardImageResource(card)}'>`)
                this.showAnotherPlayerCard(players)
                resolve()
            },150)
        }).then(()=>{this.showCard(i+1,cards,players)})
    }
    setCardClickEvent(){
        const cardsButton=$('.CardBlock img.noEvent')
        cardsButton.off('click')
        cardsButton.on('click',(e)=>{ 
            let newButtons = $('.CardBlock img.noEvent')
            $(e.target).toggleClass('choiced')
            $(e.target).toggleClass('notChoiced')
            newButtons.each(i=>{
                if(newButtons[i]==e.target){
                    if(this.choiced.includes(i)){
                        this.choiced.remove(i)
                    }
                    else{
                        this.choiced.push(i)
                    }
                }
            })  
            console.log(this.choiced)
        })      
        for(let i=0;i<cardsButton.length;i++){
            console.log($(cardsButton[i]));
        }
           
    }
    showAnotherPlayerCard(players){
        if(players.length>=2)$('.box.right').append(`<img src='/images/cards/back.png'>`)
        if(players.length>=3)$('.box.top').append(`<img src='/images/cards/back.png'>`)
        if(players.length>=4)$('.box.left').append(`<img src='/images/cards/back.png'>`)
    }
    setThrowCardButton(){
        $('#throwCard').on('click',()=>{
            const cards=[]
            this.choiced.forEach((it)=>{
                cards.push(this.handCards[it])
            })
            client.emit('ThrowCardRequest',this.packetBuilder
            .addData('name',this.userName)
            .addData('cards',cards)
            .addData('choiced',this.choiced)
            .addData('roomID',this.roomID)
            .build())
        })
    }
}