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

dragula([document.querySelector(".property-rows")], {
    revertOnSpill: true,
    mirrorContainer: document.querySelector(".property-rows"),
    moves: (el, container, handle) => {
      return handle.classList.contains("drag-handle")
    }
  })
  .on("shadow", (el, container, source) => {
    container.classList.add("no-anim");
  })
  .on("drop", (el, target, source, siblings) => {
    Entry.syncWithDOM()
    setTimeout(() => {
        document.querySelector(".property-rows").classList.remove("no-anim")
    }, 500)
  });