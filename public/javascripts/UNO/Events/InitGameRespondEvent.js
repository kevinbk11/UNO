class InitGameRespondEvent extends SocketEvent{
    static self=new this()
    constructor(){
        super('InitGameRespondEvent')
        this.choiced=[]
        this.restart;
        this.isSetDrawButtonEvent=false
        this.handler=(data)=>{
            this.restart=data.restart
            Card.sort(data.cards)
            while(this.handCards.length>0)this.handCards.pop()
            data.cards.forEach((it)=>{
                this.handCards.push(it)
            })
            this.showCard(0,data.cards,data.players,data.restart)
            const firstCard=data.firstCard
            $('#dropped').attr('src',CardResourceProcessor.processor.getCardImageResource(firstCard))
            if(data.whoFirst==data.number){
                const text = $('.name-display1 #name1').text()
                $('.name-display1 #name1').text(`${text}✔️`)
            }
        }
        SocketEvent.events.push(this)
    }
    clearChoiced(){
        this.choiced=[]
    }
    showCard(i,cards,players){
        if(i==cards.length){
            this.setCardClickEvent()
            if(!this.restart){
                this.setThrowCardButton()
                this.setDrawButtonEvent()
            }
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
        cardsButton.on('click',(e)=>{ 
            let newButtons = $('.CardBlock img')
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
        cardsButton.removeClass('noEvent')
           
    }
    showAnotherPlayerCard(players){
        if(players.length>=2)$('.box.right ').append(`<img src='/images/cards/back.png'>`)
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
    setDrawButtonEvent(){
        const handler = ()=>{
            $('#draw').off('click')
            this.isSetDrawButtonEvent=
            client.emit('DrawOneCardRequest',this.packetBuilder
            .addData('roomID',this.roomID)
            .addData('name',this.userName)
            .build())
            setTimeout(()=>{
                for(let i=0;i<20;i++){
                    $("#draw").off('click')
                }
                $('#draw').on('click',handler)
            },170)
        }
        if(!this.isSetDrawButtonEvent){
            for(let i=0;i<20;i++){
                $("#draw").off('click')
            }
            $('#draw').on('click',handler)
            this.isSetDrawButtonEvent=true
        }
    }
    
}