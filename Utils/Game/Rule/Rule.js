const CARD_TYPE = require("../Card/CARD_TYPE");
const AllowMultipleThrow = require("./RuleStrategy/MultipleThrow/AllowMultipleThrow");
const AllowStacking = require("./RuleStrategy/Stacking/AllowStacking");
const NoMultipleThrow = require("./RuleStrategy/MultipleThrow/NoMultipleThrow");
const NoStacking = require("./RuleStrategy/Stacking/NoStacking");
module.exports=class Rule{
    constructor(){
        this.isAllowThrowMultipleCard;
        this.isAllowStacking;
        this.throwMultipleCardStrategy;
        this.stackingStrategy;
        
    }
    static buildRule(data){
        let newRule = new this()
        newRule.isAllowThrowMultipleCard=data.isAllowThrowMultipleCard
        newRule.isAllowStacking=data.isAllowStacking
        newRule.setStrategy()
        return newRule
    }
    setStrategy(){
        this.throwMultipleCardStrategy= this.isAllowThrowMultipleCard ? new AllowMultipleThrow() : new NoMultipleThrow() 
        this.stackingStrategy= this.isAllowStacking ? new AllowStacking() : new NoStacking()
        console.log(this.isAllowStacking)
        console.log(this.stackingStrategy)
    }
    executeMultipleCardStrategy(game,cards){
        return this.throwMultipleCardStrategy.execute(game,cards)
    }
    executeStackingStrategy(game){
        return this.stackingStrategy.execute(game)
    }
    checkLastCardHasColor(game){
        if(game.lastCard.isNoColor()){
            nowPlayer.sendError('上家還未選擇顏色')
            return false
        }
    }

}