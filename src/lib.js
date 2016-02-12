/** @jsx Reaxt.addNode*/

let seedrandom = require('seedrandom')
seedrandom('hello.', { global: true });
let _ = require('lodash');


let defaultfont = "Minion Pro"

let uid = (n) => {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return _.sampleSize(possible, n).join('');
}

function parse(props) {
    let o = { hd: [ ], props: props }
    function accepts(n) {
        this.hd = addAs(this.hd, n, _.get(this.props, n))
        return this
    }
    function get() {
        return getOpts(this.hd).join(', ')
    }
    o.accepts = accepts.bind(o)
    o.get = get.bind(o)
    return o
}

function addAs(a, key, value) {
    if (!_.isUndefined(value)) {
        return a.concat([{
            key, value
        }]);
    } else {
        return a
    }
}

function defineNewFont(props) {
    let Font = _.get(props, "fontname", defaultfont);
    let Color = _.get(props, "fontcolor", "000000");
    let Size = _.get(props, "fontsize", 1);
    let FontUID = `\\font${uid(4)}`
    let FontCMD = `\\newfontfamily${FontUID}[Scale=${Size},Color=${Color}]{${Font}}`
    return {
        FontUID, FontCMD
    }
}

function getOpts(hd) {
    return _.map(hd, (it) => it.key + "=" + it.value);
}


let Reaxt = (function() {
    let state = {
        tags: []
    }

    let createComponent = (function(tag, body) {
        this.tags = _.concat(this.tags, [{
            tag, body
        }]);
    }).bind(state)

    let addNode = (function(tag, props, ...rchildren) {
        if (_.isUndefined(tag)) {
            return "";
        } else {
            let tg = (_.find(this.tags, (it) => it.tag === tag))
            if (!_.isUndefined(tg)) {
                return tg.body(props, ...rchildren)
            } else {
                throw `Undefined tag '${tag}'`;
            }
        }
    }).bind(state)

    let render = function(dom) {
        console.log(dom);
    }

    return {
        createComponent, render, addNode, uid, addAs, getOpts, defineNewFont, parse
    }
})();



module.exports = Reaxt
