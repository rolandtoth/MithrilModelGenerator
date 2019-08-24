var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

function sanitizeValue(str) {
	str = Utils.removeWhiteSpace(str)
    // str = Utils.upperCaseFirst(str)
    str = Utils.removeStartingDigits(str)

	return str
}

module.exports = {
    oninit: vnode => {
        vnode.state.value = sanitizeValue(vnode.attrs.value)
    },
    oncreate: vnode => {
        var input = vnode.dom.querySelector("input")

        input.setAttribute("tabindex", Entry.all().length)
        input.focus()
    },
    view: vnode => {
        return m(".block", [
            m("input.input[type=text][name=propertyName][placeholder=Property Name...]", {
                value: sanitizeValue(vnode.state.value),
                onkeydown: e => {
                    if (e.keyCode === 13) { // Enter
                        e.preventDefault()

                        if (vnode.state.value.trim()) {
                            Entry.add()
                        }
                    } else if (e.keyCode === 32) { // Space
                        e.preventDefault()
                    }
                },
                oninput: e => {
                    var v = e.target.value

                    vnode.state.value = e.target.value = sanitizeValue(v)

                    if (Utils.startsWithDigit(v)) {
                        e.target.setSelectionRange(0, 0)
                    }
                }
            })
        ])
    }
}