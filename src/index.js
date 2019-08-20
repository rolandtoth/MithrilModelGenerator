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
    mirrorContainer: document.querySelector(".property-rows")
  })
  .on("drop", function (el, target, source, siblings) {
    Entry.syncWithDOM()
  });