var root = document.body;

// Entry.create({
//     "properties": [{
//             name: "Alice",
//             email: "alice@example.com"
//         },
//         {
//             name: "Bob",
//             email: "bob@example.com"
//         }
//     ]
// })

// m.render(root, m(EntryList))

// m.render(
//     root,
//     m("main", [
//         m(
//             "h1",
//             {
//                 class: "title"
//             },
//             "TWS Model Generator"
//         ),
//         m("div", {
//             id: "config"
//         }),
//         m("div", {
//             id: "model"
//         }),
//         m("div", {
//             id: "dbEntity"
//         })
//     ])
// );

// var propertyNameInput = {
//     view: function() {
//         return m("input", {
//             type: "text",
//             placeholder: "Property name..."
//         });
//     }
// };

// var propertyTypes = ["string", "int", "DateTime", "bool"];

var propertyTypeSelect = {
    view: function () {
        const createOption = v => {
            return m(
                "option", {
                    value: v
                },
                v
            );
        };
        return m("select", propertyTypes.map(createOption));
    }
};

// const addProperty = name => console.log(name);

// var addBtn = {
//     oninit: function(vnode) {
//         vnode.state.data = vnode.attrs.text || "Add";
//     },
//     view: vnode => {
//         return m(
//             "button",
//             {
//                 onclick: e => {
//                     console.log(e.target.parentElement);
//                     vnode.state.data = "Remove";
//                     m.mount(root, controlRow);
//                 }
//             },
//             vnode.state.data
//         );
//     }
// };

// var controlRow = {
//     view: () => {
//         return m(
//             "div",
//             {
//                 class: "row"
//             },
//             [m(propertyNameInput), m(propertyTypeSelect), m(addBtn)]
//         );
//     }
// };

// var src = {
//     // oninit: function() {
//     //     console.log(111);
//     // },
//     view: function() {
//         return m(controlRow);
//     }
// };

// m.mount(root, src);