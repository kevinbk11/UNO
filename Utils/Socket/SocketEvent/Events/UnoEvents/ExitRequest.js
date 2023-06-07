const Game = require("../../../../Game/Game");
const checker = require("../../../../Game/Rule/RuleChecker");
const SocketEvent = require("../../SocketEvent");

module.exports = class ExitRequest extends SocketEvent{
    constructor(){
        super()
        this.name='ExitRequest'
        this.handler=data=>{
        }
    }
}