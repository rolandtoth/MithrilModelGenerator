var Utils = require("../../Utils")

const DEFAULT_VALUE = "SampleModel"

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
                title: "Model class name",
                value: state.value,
                placeholder: DEFAULT_VALUE,
                oninput: e => {
                    var v = e.target.value

                    v = Utils.removeWhiteSpace(v)
                    v = Utils.upperCaseFirst(v)

                    state.value = v
                }
            })
        ])
    }
}