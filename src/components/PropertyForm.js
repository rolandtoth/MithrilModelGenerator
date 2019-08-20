var Entry = require("../models/Entry");
var PropertyName = require("./inputs/PropertyName");
var PropertyType = require("./inputs/PropertyType");
var DisplayName = require("./inputs/DisplayName");
var DbFieldName = require("./inputs/DbFieldName");
var RemoveBtn = require("./buttons/RemoveBtn");

module.exports = {
    setValues: (children, id) => {
        var entry = Entry.get(id);

        entry.propertyName = children[0].state.value;
        entry.propertyType =
            children[1].state.value || PropertyType.propertyTypes[0];
        entry.displayName = children[2].state.value;
        entry.dbFieldName = children[3].state.value;
    },
    view: vnode => {
        var entry = vnode.attrs.entry;

        return m(
            "form",
            {
                "data-duplicate": (() => {
                    return (
                        Entry.all().filter(
                            m =>
                                m.propertyName.trim() !== "" &&
                                m.propertyName === entry.propertyName
                        ).length > 1
                    );
                })(),
                oninput: () => {
                    module.exports.setValues(vnode.instance.children, entry.id);
                }
            },
            [
                m(PropertyName, {
                    value: entry.propertyName
                }),
                m(PropertyType, {
                    value: entry.propertyType
                }),
                m(DisplayName, {
                    value: entry.displayName
                }),
                m(DbFieldName, {
                    value: entry.dbFieldName
                }),
                m(RemoveBtn, {
                    id: entry.id
                })
            ]
        );
    }
};
