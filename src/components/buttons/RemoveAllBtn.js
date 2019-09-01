var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    view: () => {
        return m("button[type=button].btnRemoveAll.button-transparent", {
            title: "Remove all",
            disabled: Entry.isEmpty(),
            onclick: (e) => {
                e.preventDefault()
                Entry.removeAll()
                Entry.add()
            }
        }, m.trust(Utils.getIcon("trash-2")))
    }
}