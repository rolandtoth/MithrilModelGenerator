var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    view: vnode => {
        return m("button[type=button].btnCopy.button-transparent", {
            disabled: Entry.isEmpty(),
            title: "Copy",
            onclick: e => {
                e.preventDefault()
                Utils.copyToClipboard(vnode.attrs.target)
            }
        }, m.trust(Utils.getIcon("clipboard")))
    }
}