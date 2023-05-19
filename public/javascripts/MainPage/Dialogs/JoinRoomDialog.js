class JoinRoomDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="joinRoomDialog" class=dialog title="加入房間">
            <input id=roomNumber style="width:160;">
            <input id=check class=ui-button style="width:80;margin-top:5" value="確定">
        </div>`)
    }
    create(){
        if(JoinRoomDialog.dialog!=null)return
        super.create()
        $('#joinRoomDialog').dialog({
            width:210
            ,resizable:false
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'drop'}
            ,hide:{effect:'explode'}
        });
        JoinRoomDialog.dialog=this
    }
    show(){
        $('#joinRoomDialog').dialog('open');
    }
    hide(){
        $('#joinRoomDialog').dialog('close');
    }
}