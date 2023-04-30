class Dialog{
    constructor(content){
        this.content=content;
    }
    create(){
        $('#content').append(this.content)
    }
}