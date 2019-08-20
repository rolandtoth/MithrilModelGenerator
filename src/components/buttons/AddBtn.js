var Entry = require("../../models/Entry")

module.exports = {
    view: () => {
        return m("button.btnAdd", {
            onclick: (e) => {
                e.preventDefault()
                Entry.add()
            }
        }, "Add New Property")
    }
}