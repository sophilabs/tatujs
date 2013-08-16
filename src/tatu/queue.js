goog.provide('tatu.Queue');

tatu.Queue = function () {
    this._queue = [];
    this._sequence = 0;
};

tata.Queue.CONCURRENT_REQUESTS = 4;

tatu.Queue.prototype.all = function () {
    return this._queue;
};

tatu.Queue.prototype._order = function (property) {
    this._queue.sort(function (a, b) {
        var a = a[property];
        var b = b[property];
        return a > b ? 1 : a < b ? -1 : 0;
    });
};

tatu.Queue.prototype.order = function () {
    for (var i = 0; i < arguments.length; i++) {
        this._order(arguments[i]);
    }
};

tatu.Queue.prototype.next = function () {
    this.order('id', 'priority');
    return this._queue[0];
};

tatu.Queue.prototype.idle = function () {
    return this._queue.length < tatu.Queue.CONCURRENT_REQUESTS;
}