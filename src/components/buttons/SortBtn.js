var Entry = require("../../models/Entry")
var Utils = require("../../Utils")

module.exports = {
    view: () => {
        return m("button.btnSort.button-transparent", {
            disabled: Entry.all().length <= 1,
            title: "Sort by name",
            onclick: (e) => {
                e.preventDefault()
                Entry.sortByName()
            }
        }, m.trust(Utils.getIcon("bar-chart")))
    }
}