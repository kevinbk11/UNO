class RuleBuilder
{
    constructor()
    {
        this.rule={isAllowThrowMultipleCard:false,isAllowStacking:false}
    }
    setAllowThrowMultipleCard(state){
        this.rule.isAllowThrowMultipleCard=state
        return this
    }
    setAllowStacking(state){
        this.rule.isAllowStacking=state
        return this
    }
    build()
    {
        let res = this.rule
        return res
    }
}