var Entry = require("../../models/Entry")

module.exports = {
    view: () => {
        return m(".import-wrap", [
            m("button.bntImport", {
                onclick: () => {
                    document.getElementById("btnImportFileSelect").click()
                }
            }, "Import JSON"),
            m("input[type=file]#btnImportFileSelect.hidden", {
                accept: ".json,application/json",
                value: null,
                onchange: e => {
                    Entry.processImport(e)
                }
            })
        ])
    }
}