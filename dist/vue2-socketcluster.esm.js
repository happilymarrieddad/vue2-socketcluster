/**
 * Vue2Socketcluster v1.0.0
 * (c) 2018 Nick Kotenberg
 * @license MIT
 */
var SC = require('socketcluster-client');

var SocketFactory = function SocketFactory(opts) {
    this.socket = SC.connect(opts);
    this.debug = opts.debug || false;
};

SocketFactory.prototype._log = function _log () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

    if (this.debug) { console.log.apply(console, args); }
};

SocketFactory.prototype.prop = function prop (field) {
    return this.socket[field]
};

SocketFactory.prototype.emit = function emit (channel,data,respond) {
    var self = this;
    return new Promise(function (resolve,reject) {
        self.socket.emit(channel,data,function (err,res) {
            respond && respond(err,res);
            if (err) {
                self._log(err);
                return reject(err)
            }

            return resolve(res)
        });
    })
};

SocketFactory.prototype.publish = function publish (channel,data,respond) {
    var self = this;
    return new Promise(function (resolve,reject) {
        self.socket.publish(channel,data,function (err,res) {
            respond && respond(err,res);
            if (err) {
                self._log(err);
                return reject(err)
            }

            return resolve(res)
        });
    })
};

SocketFactory.prototype.subscribe = function subscribe () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).subscribe.apply(ref, args)
};

SocketFactory.prototype.unsubscribe = function unsubscribe () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).unsubscribe.apply(ref, args)
};

SocketFactory.prototype.channel = function channel () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).channel.apply(ref, args)
};

SocketFactory.prototype.watch = function watch () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).watch.apply(ref, args)
};

SocketFactory.prototype.unwatch = function unwatch () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).unwatch.apply(ref, args)
};

SocketFactory.prototype.on = function on () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    (ref = this.socket).on.apply(ref, args);
};

SocketFactory.prototype.off = function off () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    (ref = this.socket).on.apply(ref, args);
};

SocketFactory.prototype.getState = function getState () {
    return this.socket.getState()
};

SocketFactory.prototype.getAuthToken = function getAuthToken () {
    return this.socket.getAuthToken()
};

SocketFactory.prototype.getSignedAuthToken = function getSignedAuthToken () {
    return this.socket.getSignedAuthToken()
};

SocketFactory.prototype.disconnect = function disconnect () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).disconnect.apply(ref, args)
};

SocketFactory.prototype.send = function send () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).send.apply(ref, args)
};

SocketFactory.prototype.authenticate = function authenticate () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).authenticate.apply(ref, args)
};

SocketFactory.prototype.deauthenticate = function deauthenticate () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).deauthenticate.apply(ref, args)
};

SocketFactory.prototype.watchers = function watchers () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).watchers.apply(ref, args)
};

SocketFactory.prototype.destroyChannel = function destroyChannel () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).destroyChannel.apply(ref, args)
};

SocketFactory.prototype.subscriptions = function subscriptions () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).subscriptions.apply(ref, args)
};

SocketFactory.prototype.isSubscribed = function isSubscribed () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).isSubscribed.apply(ref, args)
};

SocketFactory.prototype.destroy = function destroy () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
    return (ref = this.socket).destroy.apply(ref, args)
};

function install (_Vue,options) {
    function vue2SocketclusterInit() {
        var options = this.$options;

        if (options.socket) {
            this.$socket = options.socket;
        } else if (options.parent && options.parent.$socket) {
            this.$socket = options.parent.$socket;
        } else {
            var soc = new SocketFactory(options);

            this.$socket = soc;
        }

    }

    var usesInit = _Vue.config._lifecycleHooks.indexOf('init') > -1;
    _Vue.mixin(usesInit ? { init: vue2SocketclusterInit } : { beforeCreate: vue2SocketclusterInit });
}

var index_esm = {
  install: install,
  SocketFactory: SocketFactory
}

export default index_esm;
export { install, SocketFactory };
