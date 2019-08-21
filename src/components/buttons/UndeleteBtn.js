var Entry = require("../../models/Entry")

module.exports = {
    view: vnode => {
        return m("button.btnUndelete", {
	        disabled: Entry.undeleteCount() === 0,
            onclick: e => {
                e.preventDefault()
                Entry.undelete()
            },
        }, "Undelete")
    }
}