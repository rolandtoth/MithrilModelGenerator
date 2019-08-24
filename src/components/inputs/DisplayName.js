var Utils = require("../../Utils")

function sanitizeValue(str) {
	str = Utils.removeDoubleWhiteSpace(str)
    // str = Utils.upperCaseFirst(str, null)

	return str
}

module.exports = {
    oninit: vnode => {
        vnode.state.value = sanitizeValue(vnode.attrs.value)
    },
    view: vnode => {
        return m(".block", [
            m("input.input[type=text][name=displayName][placeholder=DisplayName...]", {
                value: sanitizeValue(vnode.state.value),
                oninput: e => {
                    vnode.state.value = sanitizeValue(e.target.value)
                }
            })
        ])
    }
}