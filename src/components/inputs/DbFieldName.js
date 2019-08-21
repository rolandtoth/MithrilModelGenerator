var Utils = require("../../Utils")

function sanitizeValue(str) {
	return Utils.removeWhiteSpace(str).toUpperCase()
}

module.exports = {
    oninit: vnode => {
        vnode.state.value = sanitizeValue(vnode.attrs.value)
    },
    view: vnode => {
        return m(".block", [
            m("input.input[type=text][name=dbFieldName][placeholder=DB Field Name...]", {
                value: sanitizeValue(vnode.state.value),
                oninput: e => {
                    vnode.state.value = sanitizeValue(e.target.value)
                }
            })
        ])
    }
}