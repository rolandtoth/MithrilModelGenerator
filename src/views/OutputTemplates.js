const Entry = require("../models/Entry")
const ModelClassName = require("../components/inputs/ModelClassName")
const CustomDbEntityClassName = require("../components/inputs/CustomDbEntityClassName")
const Namespace = require("../components/inputs/Namespace")
const Utils = require("../Utils")

var cdb
var cdbEntityClass
var cdbInstanceFields
var entries
var modelClass
var ns
var properties
var propertiesDBE

function getIndent(count = 1, tabSize = 4) {
    return " ".repeat(count * tabSize)
}

function getSafeMethod(type) {
    let method = "GetSafeString"

    type = type.replace("?", "").toLowerCase()

    switch (type) {
        case "int":
            method = "GetSafeInt32"
            break
        case "bool":
            method = "GetSafeBool"
            break
        case "datetime":
            method = "GetSafeDateTime"
            break
    }

    return method
}

module.exports = {
    getData: () => {
        entries = Utils.removeDuplicates(Entry.all(), "propertyName")

        properties = []
        cdb  = []
        propertiesDBE = []
        cdbInstanceFields = []

        ns = Namespace.get()
        modelClass = ModelClassName.get()
        cdbEntityClass = CustomDbEntityClassName.get()
        
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i]
        
            var displayNameLine = ""
            var propertyLine = ""
        
            var propertyName = Utils.upperCaseFirst(entry.propertyName)
        
            if (!propertyName) continue
        
            var propertyType = entry.propertyType
            var displayName = Utils.upperCaseFirst(entry.displayName)
            var dbFieldName = (entry.dbFieldName || propertyName).toUpperCase()
            var safeMethod = getSafeMethod(propertyType)
        
            if (displayName) {
                displayNameLine = `[DisplayName("${displayName}")]\n${getIndent(2)}`
            }
        
            propertyLine = `public ${propertyType} ${propertyName} { get; set; }\n`
        
            properties.push(`${displayNameLine}${propertyLine}`)
            propertiesDBE.push(`public ${propertyType} ${dbFieldName} { get; set; }`)
        
            cdb.push(`${propertyName} = wkResult.${dbFieldName};`)
            cdbInstanceFields.push(`instance.${dbFieldName} = dr.${safeMethod}("${dbFieldName}");`)
        }

        return properties.length
    },
    getModelTemplate: () => {
        if (!module.exports.getData()) return ""

        return `using System;
using System.ComponentModel;
using Infrastructure.Data.CustomDbEntities;

namespace ${ns}
{
    public class ${modelClass}
    {
        ${properties.join(`\n${getIndent(2)}`)}
        public ${modelClass}(${cdbEntityClass} wkResult)
        {
            ${cdb.join(`\n${getIndent(3)}`)}
        }

        public ${modelClass}() { }
    }
}`
    },
    getDbEntityTemplate: () => {
        if (!module.exports.getData()) return ""

        return `using System;
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

            return instance;
        }
    }
}`
    }
}