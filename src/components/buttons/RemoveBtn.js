var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    view: vnode => {
        var id = vnode.attrs.id

        return m("button.btnRemove.button-transparent", {
	        title: "Remove",
            onclick: e => {
                e.preventDefault()
                Entry.removeAt(id)
            },
        }, m.trust(Utils.getIcon("x")))
    }
}