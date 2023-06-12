class Card{
    static colors = {'red':1,'yellow':2,'blue':3,'green':4,null:0}
    static types = {'number':1,'stop':2,'reverse':3,'+2':4,'wild':5,'+4':6}
    constructor(color,number,type){
        this.color=color
        this.number=number
        this.type=type
    }

    static sort(cards,by='number'){
        const colors = Card.colors
        console.log(by)
        if(by=='number'){
            cards.sort((a,b)=>{
                if(a.number>b.number)return 1
                if(a.number<b.number)return -1
                if(a.number==b.number){
                    if(colors[a.color]<colors[b.color])return 1
                    if(colors[a.color]>colors[b.color])return -1
                    return 0
                }
            })
        }
        else{
            console.log("???????")
            cards.sort((a,b)=>{
                if(colors[a.color]>colors[b.color])return -1
                if(colors[a.color]<colors[b.color])return 1
                if(colors[a.color]==colors[b.color]){
                    if(a.number>b.number)return 1
                    if(a.number<b.number)return -1
                    return 0
                }
            })
        }
    }

    static insertCard(cards,by='number'){
        const swap = (arr,i) => {
            
            [arr[i],arr[i+1]] = [arr[i+1], arr[i]]
            const cardImgs = $('.CardBlock img')
            let e1 = cardImgs[i]
            let e2 = cardImgs[i+1]
            let temp = $(e1).css('z-index')
            $(e1).css('z-index',$(e2).css('z-index'))
            $(e2).css('z-index',temp)
            $(e1).insertAfter($(e2))
        }
        if(by=='color'){
            for (let i = cards.length - 2; i >= 0; i--) {
                let cardA = cards[i]
                let cardB = cards[i + 1]
                if (Card.colors[cardA.color] < Card.colors[cardB.color])
                    swap(cards,i)
                else if (Card.colors[cardA.color] == Card.colors[cardB.color]) {
                    Card.types[cardA] > Card.types[cardB]
                    if (cardA.number > cardB.number) {
                        swap(cards,i)
                    }
                }
                else{
                    return i
                }
            }
        }
        else{
            for (let i = cards.length - 2; i >= 0; i--) {
                let cardA = cards[i]
                let cardB = cards[i + 1]
                if (cardA.number > cardB.number)
                    swap(cards,i)
                else if (cardA.number == cardB.number) {
                    if (Card.colors[cardA.color] < Card.colors[cardB.color]) {
                        swap(cards,i)
                    }
                }
                else{
                    return i
                }
            }
        }
    }
    isEqual(card){
        return this.color==card.color && this.number==card.number && this.type==card.type   
    }
    isEqual(color,number,type){
        return this.color==color && this.number==number && this.type==type
    }
}