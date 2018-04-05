import * as SC from 'socketcluster-client'

export function install (_Vue,options) {
    function vue2SocketclusterInit() {
        var opts = this.$options

        if (opts.socket) {
            this.$socket = opts.socket
        } else if (opts.parent && opts.parent.$socket) {
            this.$socket = opts.parent.$socket
        } else {
            this.$socket = SC.connect(options)
        }

    }

    var usesInit = _Vue.config._lifecycleHooks.indexOf('init') > -1
    _Vue.mixin(usesInit ? { init: vue2SocketclusterInit } : { beforeCreate: vue2SocketclusterInit })
}