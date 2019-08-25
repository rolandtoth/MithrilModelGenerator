var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    view: vnode => {
        return m("button.btnUndelete.button-transparent", {
            title: "Undelete",
	        disabled: Entry.undeleteCount() === 0,
            onclick: e => {
                e.preventDefault()
                Entry.undelete()
            },
        }, m.trust(Utils.getIcon("corner-up-left")))
    }
}