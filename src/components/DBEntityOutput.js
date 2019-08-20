var Entry = require("../models/Entry")
var ModelClassName = require("../components/inputs/ModelClassName")
var CustomDbEntityClassName = require("../components/inputs/CustomDbEntityClassName")
var Namespace = require("../components/inputs/Namespace")

function getSafeMethod(type) {
    let method = "GetSafeString";

    type = type.replace("?", "").toLowerCase();

    switch (type) {
        case "int":
            method = "GetSafeInt32";
            break;
        case "bool":
            method = "GetSafeBool";
            break;
        case "datetime":
            method = "GetSafeDateTime";
            break;
    }

    return method;
}

function getIndent(count = 1) {
    return "    ".repeat(count);
}

module.exports = {
    onupdate: () => {
        document.getElementById("ModelOutputDBEntity").textContent = document.getElementById("ModelOutputDBEntityTextarea").value || ""
        Prism.highlightElement(document.getElementById("ModelOutputDBEntity"))
    },
    view: () => {
        var entries = Entry.all();

        var properties = []
        var cdb = []
        var propertiesDBE = []
        var cdbInstanceFields = []

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i]

            var displayNameLine = "";
            var propertyLine = "";

            var propertyName = entry.propertyName

            if (!propertyName) continue;

            var propertyType = entry.propertyType
            var displayName = entry.displayName
            var dbFieldName = entry.dbFieldName || propertyName && propertyName.toUpperCase()

            if (displayName) {
                displayNameLine = `[DisplayName("${displayName}")]\n${getIndent(2)}`
            }

            propertyLine = `public ${propertyType} ${propertyName} { get; set; }\n`

            properties.push(`${displayNameLine}${propertyLine}`)
            propertiesDBE.push(`public ${propertyType} ${dbFieldName} { get; set; }`)

            var safeMethod = getSafeMethod(propertyType)

            cdb.push(`${propertyName} = wkResult.${dbFieldName};`)
            cdbInstanceFields.push(`instance.${dbFieldName} = dr.${safeMethod}("${dbFieldName}");`)
        }

        var ns = Namespace.get()
        var modelClass = ModelClassName.get()
        var cdbEntityClass = CustomDbEntityClassName.get()

        var template = `using System;
using System.Data.Common;
using Infrastructure.Data.DBExtensions;

namespace Infrastructure.Data.CustomDbEntities
{
    public class ${cdbEntityClass}
    {
        ${propertiesDBE.join(`\n${getIndent(2)}`)}

        public static ${cdbEntityClass} Map(DbDataReader dr)
        {
            var instance = new ${cdbEntityClass}();

            if (dr == null || dr.FieldCount == 0) {
                return instance;
            }

            ${cdbInstanceFields.join(`\n${getIndent(3)}`)}
        }

        return instance;
    }
}`

        return m("div", [
            m("textarea", {
                id: "ModelOutputDBEntityTextarea",
                style: "display: none !important;"
            }, properties.length ? template : ""),
            m("pre", [
                m("code#ModelOutputDBEntity.language-csharp")
            ])
        ])
    }
}