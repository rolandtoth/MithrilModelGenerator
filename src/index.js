var Entry = require("./models/Entry")
var Layout = require("./views/Layout")
var PropertyForm = require("./components/PropertyForm")

m.route(document.body, "/", {
  "/": {
    render: vnode => {
      return m(Layout, m(PropertyForm, vnode.attrs))
    }
  }
})

var propertyRows = document.querySelector(".property-rows")

dragula([propertyRows], {
    revertOnSpill: true,
    mirrorContainer: propertyRows,
    moves: (el, container, handle) => {
      return handle.classList.contains("drag-handle")
    }
  })
  .on("shadow", (el, target, source, siblings) => {
    Entry.syncWithDOM()
  });