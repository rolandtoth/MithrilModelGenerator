var Entry = require("../../models/Entry")

module.exports = {
    view: () => {
        return m("button[type=button].btnExport", {
            disabled: Entry.isEmpty(),
            onclick: () => {
                Entry.processExport()
            }
        }, "Export")
    }
}