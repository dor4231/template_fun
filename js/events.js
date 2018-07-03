// Create your own Event Tracker system:
//
// 1. create an `EventTracker` object
//    • it should accept a name when constructed
// 2. extend the `EventTracker` prototype with:
//    • an `on` method
//    • a `notify` method
//    • a `trigger` method
//
// EXAMPLE:
// function purchase(item) { console.log( 'purchasing ' + item); }
// function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }
//
// var nephewParties = new EventTracker( 'nephews ');
// var richard = new EventTracker( 'Richard' );
//
// nephewParties.on( 'mainEvent', purchase );
// richard.on( 'mainEvent', celebrate );
// nephewParties.notify( richard, 'mainEvent' );
//
// nephewParties.trigger( 'mainEvent', 'ice cream' );
//

var EventTracker = function(name){
    this.name = name;
    this._events = {};
    this._notify = {};
};

EventTracker.prototype.on = function(event, callback) {
    if (this._events[event] === undefined) {
        this._events[event] = [];
    }
    this._events[event].push(callback);
};

EventTracker.prototype.notify = function(object, event) {
    if (this._notify[event] === undefined) {
        this._notify[event] = [];
    }
    this._notify[event].push(object);
};

EventTracker.prototype.trigger = function(event, data) {
    var callbacks = this._events[event] || [];
    var toNotify = this._notify[event] || [];

    for(var i = 0; i < callbacks.length ; i++) {
        callbacks[i].call(this, data);
    }

    for(i = 0; i < toNotify.length ; i++) {
        toNotify[i].trigger(event, data);
    }
};

function purchase(item) { console.log( 'purchasing ' + item); }
function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }

var nephewParties = new EventTracker( 'nephews ');
var richard = new EventTracker( 'Richard' );

nephewParties.on( 'mainEvent', purchase );
richard.on( 'mainEvent', celebrate );
nephewParties.notify( richard, 'mainEvent' );

nephewParties.trigger( 'mainEvent', 'ice cream' );