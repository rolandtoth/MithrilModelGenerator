var Utils = require("../../Utils")

const DEFAULT_VALUE = "VW_TWS_SAMPLE"

var state = {
    value: DEFAULT_VALUE
}

module.exports = {
    get: () => {
        return state.value
    },
    set: v => {
        state.value = v
    },
    oncreate: vnode => {
        state.value = vnode.attrs.value || DEFAULT_VALUE
    },
    view: () => {
        return m("div", [
            m("input.input[type=text]", {
                title: "Custom DB Entity class name",
                value: state.value,
                placeholder: DEFAULT_VALUE,
                oninput: e => {
                    state.value = Utils.removeWhiteSpace(e.target.value).toUpperCase()
                }
            })
        ])
    }
}