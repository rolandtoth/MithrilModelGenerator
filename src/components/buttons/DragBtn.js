var Utils = require("../../Utils")

module.exports = {
    view: () => {
        return m("button.btnDrag.button-transparent", {
				title: "Drag to reorder"
			}, m.trust(Utils.getIcon("move")))
    }
}