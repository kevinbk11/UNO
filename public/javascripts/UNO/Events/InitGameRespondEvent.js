class InitGameRespondEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('InitGameRespondEvent')
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
            this.showCard(0,data.cards,data.players)
        }
        SocketEvent.events.push(this)
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
                console.log(card)
                if(card.type=='number')$('.box.bottom').append(`<img class ='notChoiced' src='/images/cards/${card.color}-${card.number}.png'>`)
                else if(card.color==null)$('.box.bottom').append(`<img class ='notChoiced' src='/images/cards/${card.type}.png'>`)
                else $('.box.bottom').append(`<img class ='notChoiced' src='/images/cards/${card.color}-${card.type}.png'>`)
                this.showAnotherPlayerCard(players)
                resolve()
            },150)
        }).then(()=>{this.showCard(i+1,cards,players)})
    }
    setCardClickEvent(){
        $('.box.bottom img').on('click',(e)=>{ 
            $(e.target).toggleClass('choiced')
            $(e.target).toggleClass('notChoiced')
        })                    
    }
    showAnotherPlayerCard(players){
        if(players.length>=2)$('.box.right').append(`<img src='/images/cards/back.png'>`)
        if(players.length>=3)$('.box.top').append(`<img src='/images/cards/back.png'>`)
        if(players.length>=4)$('.box.left').append(`<img src='/images/cards/back.png'>`)
    }
    setThrowCardButton(){
        $('.box.bottom').append(`<input id='throwCard' type='button' style="margin:0px 50px" value="丟牌">`)//新增丟牌按鈕
        $('#throwCard').on('click',()=>{
            let choiced = $('.choiced');
            const cards=[]
            choiced.each(function(index) {
                let temp = choiced[index].src.split('/')
                temp=temp[temp.length-1]
                temp=temp.split('.')
                cards.push(temp[0])
            });
            client.emit('ThrowCardRequest',this.packetBuilder
            .addData('name',this.userName)
            .addData('cards',cards)
            .addData('roomID',this.roomID)
            .build())
        })
    }
}