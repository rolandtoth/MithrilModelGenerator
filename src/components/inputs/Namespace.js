var Utils = require("../../Utils")

const DEFAULT_VALUE = "Infrastructure.Core.Models.SampleNamespace"

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
                title: "Namespace",
                value: state.value,
                placeholder: DEFAULT_VALUE,
                oninput: e => {
                    var v = Utils.removeWhiteSpace(e.target.value)

                    state.value = Utils.upperCaseFirst(v)
                }
            })
        ])
    }
}