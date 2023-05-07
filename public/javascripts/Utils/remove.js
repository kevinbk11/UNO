Array.prototype.remove = function(value) {
    this.splice(this.indexOf(value), 1);
}