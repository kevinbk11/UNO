class DynamicNameProcessor{
    static processor = new this()
    clearAllTick(number){
        for(let i=1;i<=number;i++){
            let text = $(`.name-display${i} #name${i}`).text()
            while(text.substring(text.length-2, text.length)=='✔️'){
                text=text.substring(0,text.length-2)
                $(`.name-display${i} #name${i}`).text(text)
            }
        }
    }
}