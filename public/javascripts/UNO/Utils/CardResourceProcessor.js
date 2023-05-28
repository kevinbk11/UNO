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
        let deg;
        if(place=='.left')deg='-90deg'
        else if(place==".top")deg='180deg'
        else if(place=='.right')deg='-270deg'
        console.log(`rotate(${deg})`)
        const noneCardResource = CardResourceProcessor.processor.getCardImageResource(null)
        $(place).append(`
        <img 
            class='notChoiced noEvent notAnimated' 
            src="${noneCardResource}" 
        >`)
        if(place=='.CardBlock')Card.insertCard(handCards)
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
}