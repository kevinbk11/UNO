class RuleIntroduceDialog extends Dialog{
    static dialog = null
    constructor(){
        super(`
        <div id="ruleIntroduceDialog" class=dialog title="規則說明" style="overflow-y: auto;max-height: 1px;font-size:20px;">
        <p style='font-size:26px;color:gray'>以下是基本規則和各個自訂規則的詳細說明。</p>
        <p>備註:此視窗是可以拖動的，可以將此視窗拖到旁邊邊看此介紹邊看規則名稱</p>
        <p style='font-size:24px;color:purple'>基本規則</p>
        <p>點選要出的牌，並且點擊右邊的出牌按鈕進行出牌。</p>
        <p>若抽牌時抽到能夠出的牌，則必須要出該張牌。</p>
        <p>玩家名字前會有綠色勾勾，代表現在是該玩家出牌。</p>
        <p>若出了+4或調色盤，會跳出一個視窗，此時請選擇你想要的顏色。</p>
        <p>若當你出完這張牌後，手上剩餘的牌能夠一次出完時，必須先按UNO再進行出牌。</p>
        <p>譬如現在手上是紅3和綠5，當我要出紅3或綠5之前，我必須先按UNO再進行出牌，否則會被罰兩張牌。</p>
        <p style='font-size:18px;color:green'>#若是啟用規則1.允許出同數字多張牌，若你出牌後手上剩餘的牌會是55，777，9999此類的形式時，也必須在出牌前點UNO。</p>
        <p style='font-size:24px;color:purple'>自選規則</p>
        <p style='color:red'>1.允許出同數字多張牌</p>
        <p>如果目前場上棄牌的數字，手上有兩張以上，就可以一次出兩張以上同數字的牌(功能牌如+2，+4，迴轉等也算)。</p>
        <p>譬如場上棄牌為紅+2，此時若你手上有多張+2，不論顏色可以一次丟多張出去。</p>
        <p style='color:red'>2.抽到有牌為止</p>
        <p>若你現在無法出牌，則必須點擊中間的UNO卡牌圖示來抽牌，並且不斷抽牌直到能夠出牌為止。</p>
        <p style='color:red'>3.+2和+4可以疊加</p>
        <p>若你丟了+2或+4，並不會馬上懲罰下一個人，而是會記錄當下總共疊了多少</p>
        <p>當玩家手上沒有+2或+4的時候出牌或抽牌，便會將和目前記錄同樣數量的卡牌罰給該玩家</p>
        <p>如三個人出牌順序為+2，+2，+4，若第四個人沒有出+2或+4，則系統會自動發8張牌給該玩家。</p>
        <p style='color:red'>4.可以抽一張牌Pass</p>
        <p>若你手上有牌，但不想出牌的話，可以點中間的UNO卡牌圖示來抽一張牌結束這回合。</p>
        <p>以上是各個自訂規則的詳細說明，打勾代表啟用</p>
        <p>希望您玩得愉快。</p>

        </div>`)

    }
    create(){
        if(RuleIntroduceDialog.dialog!=null)return
        super.create()
        $('#ruleIntroduceDialog').dialog({
            width:600
            ,height:400
            ,resizable:true
            ,draggable:true
            ,autoOpen:false
            ,show:{effect:'drop'}
            ,hide:{effect:'explode'}
        });
        ruleIntroduceDialog.dialog=this
    }
    show(){
        $('#ruleIntroduceDialog').dialog('open');
    }
    hide(){
        $('#ruleIntroduceDialog').dialog('close');
    }
}