class IntroduceDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="introduceDialog" class=dialog title="網頁說明" style="overflow-y: auto;max-height: 1px;font-size:20px;">
        <p style='font-size:32px;color:blue'>親愛的玩家您好。</p>
        <p style='font-size:32px;color:blue'>以下是這個網頁的遊玩說明。</p>
        <p>備註:此視窗是可以拖動的，可以將此視窗拖到旁邊邊看此介紹邊看遊戲畫面</p>
        <p>點選房間後會彈出一個創建房間的視窗，能夠自己選擇想要的規則，可複選。</p>
        <p>若需要各項規則的詳細解說以及範例請點開創建房間，並點選規則解釋。</p>
        <p>點選加入房間後會彈出一個加入房間的視窗，能夠輸入房號來加入房間，也能夠點選現有的房間編號來加入該房間。</p>
        <p>點選設定按鈕後會彈出設定的視窗，能夠調整遊戲中音量大小和變更手牌排序順序。</p>
        <p>希望您玩得愉快。</p>

        </div>`)

    }
    create(){
        if(IntroduceDialog.dialog!=null)return
        super.create()
        $('#introduceDialog').dialog({
            width:600
            ,height:400
            ,resizable:true
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'drop'}
            ,hide:{effect:'explode'}
        });
        IntroduceDialog.dialog=this
    }
    show(){
        $('#introduceDialog').dialog('open');
    }
    hide(){
        $('#introduceDialog').dialog('close');
    }
}