var Utils = require("../../Utils")

module.exports = {
    oninit: vnode => {
        vnode.state.value = vnode.attrs.value
    },
    view: vnode => {
        return m(".block", [
            m("input.input[type=text][name=displayName][placeholder=DisplayName...]", {
                value: vnode.state.value,
                oninput: e => {
                    var v = e.target.value

                    v = Utils.removeDoubleWhiteSpace(v)
                    v = Utils.upperCaseFirst(v, null)

                    vnode.state.value = v
                }
            }),
        ])
    }
}