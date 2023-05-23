module.exports=Array.prototype.remove = function(value) {
    const index = this.indexOf(value)
    this.splice(index, 1);
    return index
}