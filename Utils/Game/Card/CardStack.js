const Card = require('./Card')
const CARD_COLOR = require('./CARD_COLOR')
const CARD_TYPE = require('./CARD_TYPE')
module.exports=class CardStack{
    constructor(){
        this.stack=[]
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
        for(let i=1;i<4;i++){
            for(let j=0;j<4;j++){
                for(let k=0;k<2;k++){
                    this.stack.push(new Card(colors[i],null,types[i]))//設定有色功能牌
                }
            }
        }
        for(let i=4;i<=5;i++){
            for(let j=0;j<2;j++){
                this.stack.push(new Card(null,null,types[i]))
            }
        }
    }
    drawCard(){
        return this.stack.pop()
    }
    shuffle() {
        for (let i = this.stack.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.stack[i],this.stack[j]] = [this.stack[j], this.stack[i]];
        }
      }
}