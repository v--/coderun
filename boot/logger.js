function Logger() {}

Logger.prototype.enabled = true;

Logger.prototype.info = function info(message) {
    if (this.enabled)
        console.log(message);
}

Logger.prototype.error = function error(message) {
    if (this.enabled)
        console.error(message);
}
