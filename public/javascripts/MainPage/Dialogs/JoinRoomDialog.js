class JoinRoomDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="joinRoomDialog" class=dialog title="加入房間" style="overflow-y: auto;max-height: 1px;">
            <input id=roomNumber style="width:160;">
            <input id=check class=ui-button style="width:80;margin-top:5" value="確定">
            <p>可加入房號：</p>
            <div style="
                height: 150px;
                overflow-y: scroll;
                border: 1px solid #ccc;
                padding: 10px;"
            >
                <table id="dataTable" style='overflow-y: auto;max-height: 400px;'>

                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>`)
    }
    create(){
        if(JoinRoomDialog.dialog!=null)return
        super.create()
        $('#joinRoomDialog').dialog({
            width:400
            ,height:400
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