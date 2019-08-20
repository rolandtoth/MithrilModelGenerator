var Entry = require("../../models/Entry")

module.exports = {
    view: () => {
        return m("button.btnExport.small", {
            disabled: Entry.isEmpty(),
            onclick: () => {
                Entry.processExport()
            }
        }, "Export")
    }
}