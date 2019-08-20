var Layout = require("./views/Layout")
var PropertyForm = require("./components/PropertyForm")

m.route(document.body, "/", {
  "/": {
    render: function (vnode) {
      return m(Layout, m(PropertyForm, vnode.attrs))
    }
  },
  // "/list": {
  //   render: function () {
  //     return m(Layout, m(UserList))
  //   }
  // },
  // "/edit/:id": {
  //   render: function (vnode) {
  //     return m(Layout, m(UserForm, vnode.attrs))
  //   }
  // },
})