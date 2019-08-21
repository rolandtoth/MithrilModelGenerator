module.exports = {
    view: () => {
        return m("span.drag-handle", {
				title: "Drag to reorder"
			}, m.trust("&#9776;"))
    }
}