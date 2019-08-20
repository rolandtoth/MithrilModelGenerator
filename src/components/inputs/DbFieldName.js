var Utils = require("../../Utils")

module.exports = {
    oninit: vnode => {
        vnode.state.value = vnode.attrs.value
    },
    view: vnode => {
        return m(".block", [
            m("input.input[type=text][name=dbFieldName][placeholder=DB Field Name...]", {
                value: vnode.state.value,
                oninput: e => {
                    var v = e.target.value

                    v = Utils.removeWhiteSpace(v).toUpperCase()

                    vnode.state.value = v
                }
            }),
        ])
    }
}