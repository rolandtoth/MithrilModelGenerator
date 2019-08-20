module.exports = {
    propertyTypes: ["string", "int", "DateTime?", "bool"],
    oninit: vnode => {
        vnode.state.value = vnode.attrs.value
    },
    view: vnode => {
        return m(".block", [
            m("select[name=propertyType]", {
                    value: vnode.state.value || module.exports.propertyTypes[0],
                    oninput: e => vnode.state.value = e.target.value
                },
                module.exports.propertyTypes.map(v => m(`option[value=${v}]`, v))
            )
        ])
    }
}