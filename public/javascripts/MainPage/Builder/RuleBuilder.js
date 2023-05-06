class RuleBuilder
{
    constructor()
    {
        this.rule={isThrowMultipleCard:false,isOverlay:false}
    }
    setThrowMultipleCard(state){
        this.rule.isThrowMultipleCard=state
        return this
    }
    setOverlay(state){
        this.rule.isOverlay=state
        return this
    }
    build()
    {
        let res = this.rule
        return res
    }
}