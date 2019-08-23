module.exports = {
    collapsed: false,
    getCollapsedState: () => {
        return this.collapsed
    },
    view: () => {
        return m("button.btnViewToggle.button-transparent", {
            title: "Toggle details",
            class: this.collapsed ? "active" : "",
            onclick: e => {
                e.preventDefault()
                this.collapsed = !this.collapsed
            }
        }, m.trust("&#9636;"))
    }
}