var Entry = require("../../models/Entry")

module.exports = {
    view: (vnode) => {
        var id = vnode.attrs.id

        return m("button.btnRemove", {
	        title: "Remove",
            onclick: e => {
                e.preventDefault()
                Entry.removeAt(id)
            },
        }, m.trust("&times"))
    }
}