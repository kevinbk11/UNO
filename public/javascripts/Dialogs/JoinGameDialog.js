class JoinGameDialog extends Dialog{
    constructor(){
        super(`
        <div id="joinGameDialog" class=dialog title="加入房間">
            <input id=roomNumber style="width:160;">
            <input id=check class=ui-button style="width:80;margin-top:5" value="確定">
        </div>`)
        this.create()
    }
    create(){
        super.create()
        $('#joinGameDialog').dialog({width:210,resizable:false,draggable:true,autoOpen:false});
    }
    show(){
        $('#joinGameDialog').dialog('open');
    }
    hide(){
        $('#joinGameDialog').dialog('close');
    }
}