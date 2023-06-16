class ChangeColorEvent extends SocketEvent{
    static self=new this() 
    constructor(){
        super('ChangeColorEvent')
        this.handler=data=>{
            switch(data){
                case 'yellow':
                    $(".display #color").text(`現在顏色是黃色`)
                    break
                case 'green':
                    $(".display #color").text(`現在顏色是綠色`)
                    break
                case 'blue':
                    $(".display #color").text(`現在顏色是藍色`)
                    break
                case 'red':
                    $(".display #color").text(`現在顏色是紅色`)
                    break
            }
            
        }
        SocketEvent.events.push(this)
    }
}