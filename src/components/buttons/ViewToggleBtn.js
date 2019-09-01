var Utils = require("../../Utils")

module.exports = {
    collapsed: false,
    getCollapsedState: () => {
        return this.collapsed
    },
    setCollapsedState: (state) => {
        this.collapsed = state
    },
    view: () => {
        return m("button[type=button].btnViewToggle.button-transparent", {
            title: "Toggle details",
            class: this.collapsed ? "active" : "",
            onclick: e => {
                e.preventDefault()
                this.collapsed = !this.collapsed
            }
        }, m.trust(Utils.getIcon("list")))
    }
}