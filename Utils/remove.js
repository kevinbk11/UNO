const CARD_COLOR = require("./Game/Card/CARD_COLOR")
const CARD_TYPE = require("./Game/Card/CARD_TYPE")
const Card = require("./Game/Card/Card")

module.exports=Array.prototype.remove = function(value) {
    const index = this.indexOf(value)
    this.splice(index, 1);
    return index
}