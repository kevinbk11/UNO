class InitGameRespondEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('InitGameRespondEvent')
        this.handler=(data)=>{
            const colors = {'red':1,'yellow':2,'blue':3,'green':4,null:0}
            const types = {'reverse':1,'stop':2,'+2':3,'+4':4,'wild':5}
            data.cards.sort((a,b)=>{
                console.log(`${colors[a.color]},${colors[b.color]}`)
                if(colors[a.color]>colors[b.color])return -1
                if(colors[a.color]<colors[b.color])return 1
                if(colors[a.color]==colors[b.color]){
                    if(a.number>b.number)return 1
                    if(a.number<b.number)return -1
                    return 0
                }
                    
            })
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
             $('.box.bottom img').on('click',(e)=>{
                $(e.target).toggleClass('choiced')
            })

        }
        SocketEvent.events.push(this)
    }
}