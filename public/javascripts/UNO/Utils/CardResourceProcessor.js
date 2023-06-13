class CardResourceProcessor{
    static processor = new this()
    getCardImageResource(card){
        if(card=='back')return `/images/cards/back.png`
        if(card==null)return `/images/cards/none.png`
        if(card.type=='number')return `/images/cards/${card.color}-${card.number}.png`
        else if(card.color==null)return `/images/cards/${card.type}.png`
        else return `/images/cards/${card.color}-${card.type}.png`
        
    }
    setAllCardUnchoiced(){
        $('.CardBlock img').removeClass('choiced')
        $('.CardBlock img').addClass('notChoiced')
    }
    playDrawCardAnimate(place,cardResource,handCards=null){
        $('#draw').off('click')
        InitGameRespondEvent.self.isSetDrawButtonEvent=false
        let deg='0deg';
        if(place=='.left')deg='-90deg'
        else if(place==".top")deg='180deg'
        else if(place=='.right')deg='-270deg'
        const noneCardResource = this.getCardImageResource(null)
        $(place).append(`
        <img 
            class='notChoiced noEvent notAnimated' 
            src="${noneCardResource}" 
        >`)
        if(place=='.CardBlock'){
            Card.insertCard(handCards,localStorage.getItem('sortingWithColor'))
            console.log("?")
        }
        new Promise((resolve,reject)=>{
            $('#draw').effect('transfer',{to:$(`${place} img.notAnimated`)},150)
            $(".ui-effects-transfer:last").css("background-image", "url(" + cardResource + ")");
            $(".ui-effects-transfer:last").css('background-size','150px 214px')
            $(".ui-effects-transfer:last").css('transform',`rotate(${deg})`)
            setTimeout(()=>{resolve()},155)
        }).then(()=>{
            $(`${place} img.notAnimated`).attr('src',cardResource)
            $(`${place} img.notAnimated`).removeClass('notAnimated')
        })
    }
    playAnimate(myData){
        const processor = this
        function waitAnimationEnd(myData){
            //為了避免伺服器對客戶發送同時兩次請求導致動畫無法正常運行
            //所以事件觸發後會隨機等待一段時間再進行判斷是否正在播放動畫
            //但可能還是會觸發無法正常運行的BUG，但機率應該很低。
            return new Promise((resolve,reject)=>{
                const id = setInterval(()=>{
                    if(!processor.isPlayingAnimation){
                        clearInterval(id)
                        resolve(myData)
                    }
                },10+Math.random()*5)})
        }
        function play(myData){
            $('#draw').off('click')
            InitGameRespondEvent.self.isSetDrawButtonEvent=false
            const cards=myData.cards
            const length=cards.length
            const handCards=myData.handCards
            const place = myData.place
            return new Promise((resolve,reject)=>{
                processor.isPlayingAnimation=true
                let count=0;
                const id=setInterval(()=>{
                    if(count==length){
                        clearInterval(id)
                        resolve()
                    }else{
                        const it=cards[count]
                        if(handCards!=null)handCards.push(it)
                        processor.playDrawCardAnimate(place,processor.getCardImageResource(it),handCards)
                        count++
                    }
 
                },180)
            })
        }
        function reset(){
            InitGameRespondEvent.self.clearChoiced()
            InitGameRespondEvent.self.setCardClickEvent()
            InitGameRespondEvent.self.setDrawButtonEvent()
            processor.setAllCardUnchoiced()
            processor.isPlayingAnimation=false
        }
        waitAnimationEnd(myData)
        .then(myData=>play(myData))
        .then(reset)
        
    }

}