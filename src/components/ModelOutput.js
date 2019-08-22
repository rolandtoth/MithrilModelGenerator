var Entry = require("../models/Entry");
var ModelClassName = require("../components/inputs/ModelClassName");
var CustomDbEntityClassName = require("../components/inputs/CustomDbEntityClassName");
var Namespace = require("../components/inputs/Namespace");

module.exports = {
    onupdate: () => {
        document.getElementById("ModelOutput").textContent =
            document.getElementById("ModelOutputTextarea").value || "";
        Prism.highlightElement(document.getElementById("ModelOutput"));
    },
    view: () => {
        var entries = Entry.all();

        var properties = [];
        var cdb = [];
        var indent = "    ";

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];

            var displayNameLine = "";
            var propertyLine = "";

            var propertyName = entry.propertyName;

            if (!propertyName) continue;

            var propertyType = entry.propertyType;
            var displayName = entry.displayName;
            var dbFieldName = entry.dbFieldName || propertyName.toUpperCase();

            if (displayName) {
                displayNameLine = `[DisplayName("${displayName}")]\n${indent}${indent}`;
            }

            propertyLine = `public ${propertyType} ${propertyName} { get; set; }\n`;

            properties.push(`${displayNameLine}${propertyLine}`);

            cdb.push(`${propertyName} = wkResult.${dbFieldName};`);
        }

        var ns = Namespace.get();
        var modelClass = ModelClassName.get();
        var cdbEntityClass = CustomDbEntityClassName.get();

        var template = `using System;
using System.ComponentModel;
using Infrastructure.Data.CustomDbEntities;

namespace ${ns}
{
    public class ${modelClass}
    {
        ${properties.join(`\n${indent}${indent}`)}
        public ${modelClass}(${cdbEntityClass} wkResult)
        {
            ${cdb.join(`\n${indent}${indent}${indent}`)}
        }

        public ${modelClass}() { }
    }
}`;

        return m("div", [
            m(
                "textarea#ModelOutputTextarea",
                {
                    style: "display: none !important;"
                },
                properties.length ? template : ""
            ),
            m("pre", [m("code#ModelOutput.language-csharp")])
        ]);
    }
};
