var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    view: () => {
        return m("button[type=button].btnAdd.button-transparent", {
            title: "Add new property",
            onclick: (e) => {
                e.preventDefault()
                Entry.add()
            }
        }, m.trust(Utils.getIcon("plus-circle")))
    }
}