var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    view: vnode => {
        return m("button.btnCopy.small", {
            disabled: Entry.isEmpty(),
            onclick: e => {
                e.preventDefault()
                Utils.copyToClipboard(vnode.attrs.target)
            }
        }, "Copy")
    }
}