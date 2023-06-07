class GetAllRoomRespondEvent extends SocketEvent{
    static self = new this()
    constructor(){
        super('GetAllRoomRespondEvent')     
        this.handler=(data)=>{
            console.log(data.rooms)
            var table = $("#dataTable tbody");
            table.empty()
            let rawHtml = ""
            for(let i=0;i<data.rooms.length;i++){
                var roomID = data.rooms[i]
                rawHtml+=`<tr><td>${i+1}.${roomID}</td></tr>`
            }
            table.append(rawHtml)
        }
        SocketEvent.events.push(this)
    }
}