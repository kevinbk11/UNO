const Card = require('./Card')
const CARD_COLOR = require('./CARD_COLOR')
const CARD_TYPE = require('./CARD_TYPE')
module.exports=class CardStack{
    constructor(){
        this.stack=[]
        //沒牌之後可以把墳墓裡面的牌丟回stack
        //要建立一個墳墓
    }
    buildCardStack(){
        let colors = Object.values(CARD_COLOR)
        let types = Object.values(CARD_TYPE)
        for(let i=0;i<4;i++){
            for(let j=1;j<=9;j++){
                for(let k=0;k<2;k++){
                    this.stack.push(new Card(colors[i],j,CARD_TYPE.NUMBER))//設定數字牌
                }
            }
        }
        for(let i=0;i<4;i++){
            for(let j=1;j<4;j++){
                for(let k=0;k<2;k++){
                    this.stack.push(new Card(colors[i],10+j,types[j]))//設定有色功能牌
                }
            }
        }
        for(let i=4;i<=5;i++){
            for(let j=0;j<2;j++){
                this.stack.push(new Card(null,10+i,types[i]))
            }
        }
    }
    draw(){
        return this.stack.pop()
    }
    push(card){
        this.stack.push(card)
    }
    shuffle() {
        for (let i = this.stack.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.stack[i],this.stack[j]] = [this.stack[j], this.stack[i]];
        }
      }
}