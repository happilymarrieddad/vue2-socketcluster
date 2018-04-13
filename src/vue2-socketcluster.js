import * as SC from 'socketcluster-client'
import * as Emitter from 'component-emitter'

export function install (_Vue,options = {}) {
    function vue2SocketclusterInit() {
        var propName = options.propName || 'socket'
        var opts = this.$options

        if (opts.propName) {
            this['$'+propName] = opts.propName
        } else if (opts.parent && opts.parent['$'+propName]) {
            this['$'+propName] = opts.parent['$'+propName]
        } else {
            let soc = SC.connect(options)

            soc.emit = function(event,data,callback) {
                return new Promise((resolve,reject) => {
                    if (soc._localEvents[event] == null) {
                        return soc._emit(event,data,(err,res) => {
                            callback && callback(err,res)
                            if (err) return reject(err)
                            return resolve(res)
                        })
                    }

                    Emitter.prototype.emit.call(soc, event, data)
                })
            }

            soc.publish = function(channelName,data,callback) {
                return new Promise((resolve,reject) => {
                    let pubData = {
                        channel:soc._decorateChannelName(channelName),
                        data
                    }

                    soc._emit('#publish',pubData,(err,res) => {
                        callback && callback(err,res)
                        if (err) return reject(err)
                        return resolve(res)
                    })
                })
            }

            this['$'+propName] = soc
        }

    }

    var usesInit = _Vue.config._lifecycleHooks.indexOf('init') > -1
    _Vue.mixin(usesInit ? { init: vue2SocketclusterInit } : { beforeCreate: vue2SocketclusterInit })
}