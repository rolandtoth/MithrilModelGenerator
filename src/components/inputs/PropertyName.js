var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    oninit: vnode => {
        vnode.state.value = vnode.attrs.value
    },
    oncreate: vnode => {
        var input = vnode.dom.querySelector("input")

        input.setAttribute("tabindex", Entry.all().length)
        input.focus()
    },
    view: vnode => {
        return m(".block", [
            m("input.input[type=text][name=propertyName][placeholder=Property Name...]", {
                value: vnode.state.value,
                onkeydown: e => {
                    if (e.keyCode === 13) { // Enter
                        e.preventDefault()

                        if (vnode.state.value.trim()) {
                            Entry.add()
                        }
                    }
                },
                oninput: e => {
                    var v = e.target.value

                    v = Utils.removeWhiteSpace(v)
                    v = Utils.upperCaseFirst(v)

                    vnode.state.value = e.target.value = v
                }
            }),
        ]);
    }
}