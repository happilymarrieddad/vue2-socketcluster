const SC = require('socketcluster-client')

export class SocketFactory {
    constructor(opts) {
        this.socket = SC.connect(opts)
        this.debug = opts.debug || false
    }

    _log(...args) {
        if (this.debug) console.log(...args)
    }

    prop(field) {
        return this.socket[field]
    }

    emit(channel,data,respond) {
        let self = this
        return new Promise((resolve,reject) => {
            self.socket.emit(channel,data,(err,res) => {
                respond && respond(err,res)
                if (err) {
                    self._log(err)
                    return reject(err)
                }

                return resolve(res)
            })
        })
    }

    publish(channel,data,respond) {
        let self = this
        return new Promise((resolve,reject) => {
            self.socket.publish(channel,data,(err,res) => {
                respond && respond(err,res)
                if (err) {
                    self._log(err)
                    return reject(err)
                }

                return resolve(res)
            })
        })
    }

    subscribe(...args) {
        return this.socket.subscribe(...args)
    }

    unsubscribe(...args) {
        return this.socket.unsubscribe(...args)
    }

    channel(...args) {
        return this.socket.channel(...args)
    }

    watch(...args) {
        return this.socket.watch(...args)
    }

    unwatch(...args) {
        return this.socket.unwatch(...args)
    }

    on(...args) {
        this.socket.on(...args)
    }

    off(...args) {
        this.socket.on(...args)
    }

    getState() {
        return this.socket.getState()
    }

    getAuthToken() {
        return this.socket.getAuthToken()
    }

    getSignedAuthToken() {
        return this.socket.getSignedAuthToken()
    }

    disconnect(...args) {
        return this.socket.disconnect(...args)
    }

    send(...args) {
        return this.socket.send(...args)
    }

    authenticate(...args) {
        return this.socket.authenticate(...args)
    }

    deauthenticate(...args) {
        return this.socket.deauthenticate(...args)
    }

    watchers(...args) {
        return this.socket.watchers(...args)
    }

    destroyChannel(...args) {
        return this.socket.destroyChannel(...args)
    }

    subscriptions(...args) {
        return this.socket.subscriptions(...args)
    }

    isSubscribed(...args) {
        return this.socket.isSubscribed(...args)
    }

    destroy(...args) {
        return this.socket.destroy(...args)
    }

}

export function install (_Vue,options) {
    function vue2SocketclusterInit() {
        var options = this.$options

        if (options.socket) {
            this.$socket = options.socket
        } else if (options.parent && options.parent.$socket) {
            this.$socket = options.parent.$socket
        } else {
            var soc = new SocketFactory(options)

            this.$socket = soc
        }

    }

    var usesInit = _Vue.config._lifecycleHooks.indexOf('init') > -1
    _Vue.mixin(usesInit ? { init: vue2SocketclusterInit } : { beforeCreate: vue2SocketclusterInit })
}