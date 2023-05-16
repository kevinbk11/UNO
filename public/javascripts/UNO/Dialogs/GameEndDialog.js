class GameEndDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="gameEndDialog" class=dialog title="遊戲結束">
            <p style="font-size:36px" id='winnerName'></p>
            <p id='player1'></p>
            <p id='player2'></p>
            <p id='player3'></p>
            <p id='player4'></p>
            <input type='button' value='再來一局'>
            <input type='button' value='離開'>
        </div>`)
    }
    create(){
        if(GameEndDialog.dialog!=null)return
        super.create()
        $('#gameEndDialog').dialog({
            width:400
            ,resizable:false
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'slide',direction:'left'}
            ,hide:{effect:'slide',direction:'right'}});
        $('.ui-dialog-titlebar-close').css('display','none')
        GameEndDialog.dialog=this
        
    }
    show(){
        $('#gameEndDialog').dialog('open');
        //$('#changeColorDialog').effect({effect:'slide',direction:'left',duration:1000})
    }
    hide(){
        //$('#changeColorDialog').effect({effect:'slide',duration:1000})
        $('gameEndDialog').dialog('close');
    }
    setPlayersName(players){
        for(let i =1;i<=players.length;i++){
            $(`#gameEndDialog #player${i}`).text(`${i}.{players[i-1]}`)
        }
    }
    setWinner(winner){
        $(`#gameEndDialog #winnerName`).text(`勝利者是${winner}`)
    }
    //接下來實作再來一局和離開功能
    //另外，把加入房間的功能多增加可以選擇房間列表似乎是不錯的選擇。
}