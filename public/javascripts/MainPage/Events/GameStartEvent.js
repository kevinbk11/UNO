class GameStartEvent extends SocketEvent{
    static self = new this()
    constructor(){
        super('GameStartEvent')
        this.handler=(data)=>{
            var redirect = $(location).attr('href')+ `game/${data.roomID}`;
            $.extend(
            {
                redirectPost: function(location, args)
                {
                    var form = '';
                    $.each( args, function( key, value ) {
                        value = value.split('"').join('\"')
                        form += '<input type="hidden" name="'+key+'" value="'+value+'">';
                    });
                    $('<form action="' + location + '" method="POST">' + form + '</form>').appendTo($(document.body)).submit();
                }
            });
            $.redirectPost(redirect, {name:data.name});
        }
        SocketEvent.events.push(this)
    }
}